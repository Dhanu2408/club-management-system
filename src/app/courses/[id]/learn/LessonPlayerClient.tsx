'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { Lesson } from '@/types';
import { useLearning } from '@/context/LearningContext';
import { getAllLessons } from '@/lib/progress';
import { VideoPlayer } from '@/components/VideoPlayer';
import { CurriculumSidebar } from '@/components/CurriculumSidebar';
import { ChevronLeft, ChevronRight, CheckCircle, FileText, HelpCircle, StickyNote, Keyboard } from 'lucide-react';

export default function LessonPlayerClient() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const courseId = params?.id as string;
  const lessonIdFromQuery = searchParams?.get('lesson');

  const course = COURSES.find((c) => c.id === courseId);
  const {
    isHydrated,
    markLessonComplete,
    toggleLessonComplete,
    isLessonCompleted,
    enrollCourse,
    getCourseProgress,
    lastLessonByCourse,
    setLastLesson,
    lessonNotes,
    setLessonNote,
  } = useLearning();

  const [autoPlayNext, setAutoPlayNext] = useState<boolean>(true);
  const [autoStart, setAutoStart] = useState<boolean>(false);
  const [resourceNotice, setResourceNotice] = useState<string>('');

  const allLessons = useMemo(() => (course ? getAllLessons(course) : []), [course]);

  // The URL (?lesson=...) is the single source of truth for the current lesson,
  // so refresh, back/forward and shared links all open the right lesson.
  const currentLesson: Lesson | undefined =
    allLessons.find((l) => l.id === lessonIdFromQuery) ||
    (isHydrated ? allLessons.find((l) => l.id === lastLessonByCourse[courseId]) : undefined) ||
    allLessons[0];

  // Opening the player enrolls the student (after saved data has loaded).
  useEffect(() => {
    if (isHydrated && courseId && course) enrollCourse(courseId);
  }, [isHydrated, courseId, course, enrollCourse]);

  // Remember where the student stopped so "Continue Learning" can resume.
  useEffect(() => {
    if (isHydrated && course && currentLesson) setLastLesson(course.id, currentLesson.id);
  }, [isHydrated, course, currentLesson, setLastLesson]);

  // Clear the resource message when the lesson changes.
  useEffect(() => {
    setResourceNotice('');
  }, [currentLesson?.id]);

  if (!course || !currentLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Lesson Not Found</h2>
        <Link href="/courses" className="inline-block px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold">
          Back to Courses
        </Link>
      </div>
    );
  }

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);
  const isCompleted = isLessonCompleted(course.id, currentLesson.id);
  const progressPct = getCourseProgress(course.id);
  const noteValue = lessonNotes[`${course.id}:${currentLesson.id}`] ?? '';

  const goToLesson = (lesson: Lesson, autoplay = false) => {
    setAutoStart(autoplay);
    router.replace(`${pathname}?lesson=${lesson.id}`, { scroll: false });
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) goToLesson(allLessons[currentIndex - 1]);
  };

  /**
   * FIXED (was BUG 6): "Next Lesson" used currentIndex + 2 and skipped a lesson.
   * It now advances exactly one lesson.
   */
  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      goToLesson(allLessons[currentIndex + 1]);
    }
  };

  const handleMarkComplete = () => {
    toggleLessonComplete(course.id, currentLesson.id);
  };

  const handleVideoEnded = () => {
    markLessonComplete(course.id, currentLesson.id);
    if (autoPlayNext && currentIndex < allLessons.length - 1) {
      goToLesson(allLessons[currentIndex + 1], true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Course Overview
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">{course.title}</span>
          <span className="text-xs font-bold text-white bg-slate-800 border border-slate-700 rounded-md px-2 py-0.5">
            {progressPct}% complete
          </span>
        </div>
      </div>

      {/* Main Grid: Left Sidebar + Center Video + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Curriculum Sidebar */}
        <div className="order-2 lg:order-1 lg:col-span-1">
          <CurriculumSidebar
            courseId={course.id}
            modules={course.modules}
            currentLessonId={currentLesson.id}
            onSelectLesson={(lesson) => goToLesson(lesson)}
          />
        </div>

        {/* Center/Right Column: Video Player & Lesson Info */}
        <div className="order-1 lg:order-2 lg:col-span-2 space-y-6">
          {/* key= remounts the player for each lesson so playback state never leaks between lessons */}
          <VideoPlayer
            key={currentLesson.id}
            videoUrl={currentLesson.videoUrl}
            title={currentLesson.title}
            autoPlay={autoStart}
            onEnded={handleVideoEnded}
          />

          <p className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
            <Keyboard className="w-3.5 h-3.5" />
            Shortcuts: <kbd className="px-1.5 rounded bg-slate-800 text-slate-300">Space</kbd> play/pause ·{' '}
            <kbd className="px-1.5 rounded bg-slate-800 text-slate-300">J</kbd>/<kbd className="px-1.5 rounded bg-slate-800 text-slate-300">L</kbd> ±10s ·{' '}
            <kbd className="px-1.5 rounded bg-slate-800 text-slate-300">M</kbd> mute ·{' '}
            <kbd className="px-1.5 rounded bg-slate-800 text-slate-300">F</kbd> fullscreen
          </p>

          {/* Navigation & Mark Complete Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevLesson}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Previous Lesson
              </button>

              <button
                onClick={handleNextLesson}
                disabled={currentIndex >= allLessons.length - 1}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition"
              >
                Next Lesson <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoPlayNext}
                  onChange={(e) => setAutoPlayNext(e.target.checked)}
                  className="accent-violet-500"
                />
                Auto-play next
              </label>
              <button
                onClick={handleMarkComplete}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
                  isCompleted
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/25'
                }`}
                title={isCompleted ? 'Click to mark as not complete' : 'Mark this lesson as complete'}
              >
                <CheckCircle className="w-4 h-4" />
                {isCompleted ? 'Marked as Complete' : 'Mark as Complete'}
              </button>
            </div>
          </div>

          {/* Lesson Details & Resources */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-mono text-violet-400">
                Lesson {currentIndex + 1} of {allLessons.length}
              </span>
              <h1 className="text-2xl font-bold text-white">{currentLesson.title}</h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentLesson.description || 'In this lesson, you will explore foundational concepts and practice applying them in practical code scenarios.'}
              </p>
            </div>

            {/* Notes */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <StickyNote className="w-4 h-4 text-violet-400" /> My Notes
              </h3>
              <textarea
                value={noteValue}
                onChange={(e) => setLessonNote(course.id, currentLesson.id, e.target.value)}
                rows={4}
                placeholder="Write notes for this lesson. They are saved automatically in this browser."
                className="w-full rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 p-3 focus:outline-none focus:border-violet-500 transition resize-y"
              />
            </div>

            {/* Resources Section */}
            {currentLesson.resources && currentLesson.resources.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-violet-400" /> Lesson Downloads & Resources
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLesson.resources.map((res, idx) => {
                    const isPlaceholder = !res.url || res.url === '#';
                    const content = (
                      <>
                        <div className="flex items-center gap-2.5 truncate">
                          <FileText className="w-4 h-4 text-slate-400 group-hover:text-violet-400" />
                          <span className="truncate font-medium">{res.title}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 uppercase font-mono">
                          {res.type}
                        </span>
                      </>
                    );
                    const cls =
                      'flex items-center justify-between w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-violet-500/50 text-xs text-slate-200 transition group';
                    return isPlaceholder ? (
                      <button
                        key={idx}
                        type="button"
                        className={cls}
                        onClick={() =>
                          setResourceNotice(`"${res.title}" is not published yet. Real download links can be added in src/data/courses.ts.`)
                        }
                      >
                        {content}
                      </button>
                    ) : (
                      <a key={idx} href={res.url} target="_blank" rel="noopener noreferrer" className={cls}>
                        {content}
                      </a>
                    );
                  })}
                </div>
                {resourceNotice && (
                  <p role="status" className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 rounded-lg px-3 py-2">
                    {resourceNotice}
                  </p>
                )}
              </div>
            )}

            {/* Quiz CTA Banner */}
            {course.quiz && (
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <HelpCircle className="w-4 h-4 text-violet-400" /> Ready to test your comprehension?
                </div>
                <Link
                  href={`/courses/${course.id}/quiz`}
                  className="text-xs font-bold text-violet-400 hover:text-violet-300 transition"
                >
                  Take Course Quiz →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
