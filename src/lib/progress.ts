import { Course, Lesson, Question } from '../types';

/** Minimum quiz percentage required to pass (and to earn a certificate). */
export const PASS_MARK = 70;

export const getAllLessons = (course: Course): Lesson[] =>
  course.modules.flatMap((m) => m.lessons);

/**
 * Course progress = completed lessons / total lessons in THAT course.
 * Only lesson ids that actually belong to the course are counted, and the
 * result is always clamped to 0-100.
 */
export function calculateCourseProgress(
  course: Course | undefined,
  completedLessonIds: string[] = []
): number {
  if (!course) return 0;
  const lessons = getAllLessons(course);
  if (lessons.length === 0) return 0;
  const valid = new Set(lessons.map((l) => l.id));
  const done = new Set(completedLessonIds.filter((id) => valid.has(id))).size;
  return Math.min(100, Math.round((done / lessons.length) * 100));
}

export type QuizResult = {
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
};

/** Score = correct answers / total questions * 100 (e.g. 4 of 5 = 80%). */
export function calculateQuizScore(
  questions: Question[],
  answers: Record<number, number>
): QuizResult {
  const totalQuestions = questions.length;
  const correctCount = questions.reduce(
    (sum, q, idx) => sum + (answers[idx] === q.correctAnswer ? 1 : 0),
    0
  );
  const percentage =
    totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);
  return { correctCount, totalQuestions, percentage, passed: percentage >= PASS_MARK };
}

/** First lesson the student has not completed yet (falls back to lesson 1). */
export function getNextLesson(
  course: Course,
  completedLessonIds: string[] = []
): Lesson | undefined {
  const lessons = getAllLessons(course);
  return lessons.find((l) => !completedLessonIds.includes(l.id)) ?? lessons[0];
}

/** "14 min" -> 14, "1 hr 30 min" -> 90, "2 hours" -> 120. Unknown -> 0. */
export function parseDurationToMinutes(duration: string): number {
  const text = duration.toLowerCase();
  const hours = /(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours)\b/.exec(text);
  const mins = /(\d+(?:\.\d+)?)\s*(?:m|min|mins|minute|minutes)\b/.exec(text);
  return Math.round((hours ? parseFloat(hours[1]) * 60 : 0) + (mins ? parseFloat(mins[1]) : 0));
}

export function formatMinutes(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

export const toDateKey = (d: Date): string => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

/**
 * Consecutive-day learning streak ending today (or yesterday, so the streak
 * is not lost before the student has had a chance to study today).
 */
export function calculateStreak(activityDates: string[], today: Date = new Date()): number {
  const days = new Set(activityDates);
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!days.has(toDateKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(toDateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
