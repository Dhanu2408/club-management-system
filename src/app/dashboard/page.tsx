'use client';

import React from 'react';
import Link from 'next/link';
import { COURSES } from '@/data/courses';
import { useLearning } from '@/context/LearningContext';
import {
  PASS_MARK,
  calculateStreak,
  formatMinutes,
  getAllLessons,
  getNextLesson,
  parseDurationToMinutes,
} from '@/lib/progress';
import { BookOpen, CheckCircle, Clock, Flame, PlayCircle, GraduationCap, HelpCircle, RotateCcw, LogIn } from 'lucide-react';

export default function StudentDashboardPage() {
  const {
    isHydrated,
    isLoggedIn,
    user,
    enrolledCourseIds,
    getCourseProgress,
    completedLessonIds,
    quizScores,
    activityDates,
    resetProgress,
  } = useLearning();

  if (!isHydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-400" aria-busy="true">
        Loading your learning hub…
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto text-violet-400">
          <LogIn className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-white">Please log in</h1>
        <p className="text-sm text-slate-400">Your dashboard shows your courses, progress and quiz scores once you are signed in.</p>
        <Link href="/login" className="inline-block px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition">
          Go to Login
        </Link>
      </div>
    );
  }

  const enrolledCourses = COURSES.filter((c) => enrolledCourseIds.includes(c.id));

  const completedCoursesCount = enrolledCourses.filter((course) => getCourseProgress(course.id) === 100).length;

  // Learning time = total length of every lesson the student has completed.
  const minutesLearned = COURSES.reduce((sum, course) => {
    const done = completedLessonIds[course.id] || [];
    return (
      sum +
      getAllLessons(course)
        .filter((l) => done.includes(l.id))
        .reduce((m, l) => m + parseDurationToMinutes(l.duration), 0)
    );
  }, 0);

  const streak = calculateStreak(activityDates);

  const handleReset = () => {
    if (window.confirm('Reset your progress, quiz scores, notes and saved courses to the demo defaults?')) {
      resetProgress();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Welcome Greeting Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-block px-3 py-1 rounded bg-violet-900/80 text-violet-300 text-xs font-bold uppercase tracking-wider">
            Student Learning Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Welcome back, {user?.name || 'Student'}!</h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Track your ongoing tech courses, view learning stats, and jump straight back into your active lessons.
          </p>
        </div>
      </div>

      {/* Dashboard Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{enrolledCourses.length}</div>
            <div className="text-xs text-slate-400 font-medium">Courses Enrolled</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{completedCoursesCount}</div>
            <div className="text-xs text-slate-400 font-medium">Courses Completed</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{formatMinutes(minutesLearned)}</div>
            <div className="text-xs text-slate-400 font-medium">Time Learned</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {streak} {streak === 1 ? 'Day' : 'Days'}
            </div>
            <div className="text-xs text-slate-400 font-medium">Current Streak</div>
          </div>
        </div>
      </div>

      {/* My Learning Enrolled Courses */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">My Learning</h2>
          <Link href="/courses" className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition">
            Explore More Courses →
          </Link>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const progressPct = getCourseProgress(course.id);
              const nextLesson = getNextLesson(course, completedLessonIds[course.id] || []);
              const best = quizScores[course.id];
              const certificateReady = progressPct === 100 && best !== undefined && best >= PASS_MARK;

              return (
                <div
                  key={course.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 hover:border-violet-500/40 transition shadow-xl"
                >
                  <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-slate-950 shrink-0 relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-bold text-violet-400 uppercase">
                      {course.category}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-1">Instructor: {course.instructor.name}</p>
                    </div>

                    {/* Progress Bar & Percentage */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Course Progress</span>
                        <span className="font-bold text-violet-400">{progressPct}%</span>
                      </div>
                      <div
                        className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800"
                        role="progressbar"
                        aria-valuenow={progressPct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${course.title} progress`}
                      >
                        <div
                          className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300"
                          style={{ width: `${Math.min(progressPct, 100)}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {best !== undefined ? `Best quiz score: ${best}%` : 'Quiz not taken yet'}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {nextLesson && (
                        <Link
                          href={`/courses/${course.id}/learn?lesson=${nextLesson.id}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 min-w-[140px] py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 text-xs font-semibold transition"
                        >
                          <PlayCircle className="w-4 h-4" /> {progressPct === 100 ? 'Review Course' : 'Continue Learning'}
                        </Link>
                      )}
                      <Link
                        href={`/courses/${course.id}/quiz`}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
                      >
                        <HelpCircle className="w-4 h-4" /> Quiz
                      </Link>
                      {certificateReady && (
                        <Link
                          href={`/courses/${course.id}/certificate`}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs font-semibold transition"
                        >
                          <GraduationCap className="w-4 h-4" /> Certificate
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center space-y-4">
            <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No enrolled courses yet</h3>
            <p className="text-sm text-slate-400">Browse our course catalogue and start building modern tech skills today.</p>
            <Link href="/courses" className="inline-block px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition">
              Explore Catalogue
            </Link>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex justify-end">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-rose-400 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset demo data
        </button>
      </div>
    </div>
  );
}
