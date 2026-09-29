'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { COURSES } from '../data/courses';
import { calculateCourseProgress, toDateKey } from '../lib/progress';

type User = { name: string; email: string };

interface LearningContextType {
  /** false until saved data has been loaded from the browser (avoids UI flicker). */
  isHydrated: boolean;
  user: User | null;
  isLoggedIn: boolean;
  login: (email?: string, password?: string, displayName?: string) => void;
  logout: () => void;
  enrolledCourseIds: string[];
  enrollCourse: (courseId: string) => void;
  completedLessonIds: Record<string, string[]>;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  toggleLessonComplete: (courseId: string, lessonId: string) => void;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  /** Best quiz score (percentage) per course. */
  quizScores: Record<string, number>;
  saveQuizScore: (courseId: string, score: number) => void;
  getCourseProgress: (courseId: string) => number;
  bookmarkedCourseIds: string[];
  toggleBookmark: (courseId: string) => void;
  lessonNotes: Record<string, string>;
  setLessonNote: (courseId: string, lessonId: string, note: string) => void;
  lastLessonByCourse: Record<string, string>;
  setLastLesson: (courseId: string, lessonId: string) => void;
  /** YYYY-MM-DD keys of days the student was active (drives the streak). */
  activityDates: string[];
  resetProgress: () => void;
}

type PersistedState = {
  user: User | null;
  isLoggedIn: boolean;
  enrolledCourseIds: string[];
  completedLessonIds: Record<string, string[]>;
  quizScores: Record<string, number>;
  bookmarkedCourseIds: string[];
  lessonNotes: Record<string, string>;
  lastLessonByCourse: Record<string, string>;
  activityDates: string[];
};

const STORAGE_KEY = 'skillforge:state:v1';

/** Demo data so the dashboard looks realistic on the very first visit. */
const DEFAULT_STATE: PersistedState = {
  user: { name: 'Alex Johnson', email: 'alex.student@skillforge.io' },
  isLoggedIn: true,
  enrolledCourseIds: ['course-1', 'course-2', 'course-3', 'course-7'],
  completedLessonIds: {
    'course-1': ['les-1-1-1'],
    'course-2': ['les-2-1-1'],
    'course-3': [],
    'course-7': ['les-7-1-1'],
  },
  quizScores: {},
  bookmarkedCourseIds: [],
  lessonNotes: {},
  lastLessonByCourse: {},
  activityDates: [],
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

const noteKey = (courseId: string, lessonId: string) => `${courseId}:${lessonId}`;
const today = () => toDateKey(new Date());
const addToday = (dates: string[]) => (dates.includes(today()) ? dates : [...dates, today()]);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved progress once, on the client.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState({ ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<PersistedState>) });
      }
    } catch {
      /* corrupted or blocked storage: fall back to defaults */
    }
    setIsHydrated(true);
  }, []);

  // Save on every change (only after the initial load, so defaults never overwrite real data).
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or disabled: the app keeps working in memory */
    }
  }, [state, isHydrated]);

  const login = useCallback((email?: string, _password?: string, displayName?: string) => {
    const cleanEmail = email?.trim();
    const rawName = displayName?.trim() || (cleanEmail ? cleanEmail.split('@')[0] : 'Student');
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    setState((s) => ({
      ...s,
      user: { name, email: cleanEmail || 'student@skillforge.io' },
      isLoggedIn: true,
    }));
  }, []);

  const logout = useCallback(() => {
    setState((s) => ({ ...s, user: null, isLoggedIn: false }));
  }, []);

  const enrollCourse = useCallback((courseId: string) => {
    setState((s) =>
      s.enrolledCourseIds.includes(courseId)
        ? s
        : { ...s, enrolledCourseIds: [...s.enrolledCourseIds, courseId] }
    );
  }, []);

  const markLessonComplete = useCallback((courseId: string, lessonId: string) => {
    setState((s) => {
      const current = s.completedLessonIds[courseId] || [];
      if (current.includes(lessonId)) return s;
      return {
        ...s,
        completedLessonIds: { ...s.completedLessonIds, [courseId]: [...current, lessonId] },
        activityDates: addToday(s.activityDates),
      };
    });
  }, []);

  const toggleLessonComplete = useCallback((courseId: string, lessonId: string) => {
    setState((s) => {
      const current = s.completedLessonIds[courseId] || [];
      const next = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      return {
        ...s,
        completedLessonIds: { ...s.completedLessonIds, [courseId]: next },
        activityDates: current.includes(lessonId) ? s.activityDates : addToday(s.activityDates),
      };
    });
  }, []);

  const isLessonCompleted = useCallback(
    (courseId: string, lessonId: string) =>
      (state.completedLessonIds[courseId] || []).includes(lessonId),
    [state.completedLessonIds]
  );

  const saveQuizScore = useCallback((courseId: string, score: number) => {
    setState((s) => ({
      ...s,
      quizScores: { ...s.quizScores, [courseId]: Math.max(score, s.quizScores[courseId] ?? 0) },
      activityDates: addToday(s.activityDates),
    }));
  }, []);

  /**
   * FIXED (was BUG 4): progress is completed lessons / total lessons of THIS course.
   * It used to divide by a hardcoded 100, so progress barely moved.
   */
  const getCourseProgress = useCallback(
    (courseId: string): number =>
      calculateCourseProgress(
        COURSES.find((c) => c.id === courseId),
        state.completedLessonIds[courseId] || []
      ),
    [state.completedLessonIds]
  );

  const toggleBookmark = useCallback((courseId: string) => {
    setState((s) => ({
      ...s,
      bookmarkedCourseIds: s.bookmarkedCourseIds.includes(courseId)
        ? s.bookmarkedCourseIds.filter((id) => id !== courseId)
        : [...s.bookmarkedCourseIds, courseId],
    }));
  }, []);

  const setLessonNote = useCallback((courseId: string, lessonId: string, note: string) => {
    setState((s) => ({ ...s, lessonNotes: { ...s.lessonNotes, [noteKey(courseId, lessonId)]: note } }));
  }, []);

  const setLastLesson = useCallback((courseId: string, lessonId: string) => {
    setState((s) =>
      s.lastLessonByCourse[courseId] === lessonId
        ? s
        : { ...s, lastLessonByCourse: { ...s.lastLessonByCourse, [courseId]: lessonId } }
    );
  }, []);

  const resetProgress = useCallback(() => {
    setState((s) => ({
      ...DEFAULT_STATE,
      user: s.user,
      isLoggedIn: s.isLoggedIn,
    }));
  }, []);

  const value = useMemo<LearningContextType>(
    () => ({
      isHydrated,
      user: state.user,
      isLoggedIn: state.isLoggedIn,
      login,
      logout,
      enrolledCourseIds: state.enrolledCourseIds,
      enrollCourse,
      completedLessonIds: state.completedLessonIds,
      markLessonComplete,
      toggleLessonComplete,
      isLessonCompleted,
      quizScores: state.quizScores,
      saveQuizScore,
      getCourseProgress,
      bookmarkedCourseIds: state.bookmarkedCourseIds,
      toggleBookmark,
      lessonNotes: state.lessonNotes,
      setLessonNote,
      lastLessonByCourse: state.lastLessonByCourse,
      setLastLesson,
      activityDates: state.activityDates,
      resetProgress,
    }),
    [
      isHydrated, state, login, logout, enrollCourse, markLessonComplete, toggleLessonComplete,
      isLessonCompleted, saveQuizScore, getCourseProgress, toggleBookmark, setLessonNote,
      setLastLesson, resetProgress,
    ]
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
