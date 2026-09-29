'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { useLearning } from '@/context/LearningContext';
import { getNextLesson } from '@/lib/progress';
import { Star, Users, Clock, ShieldCheck, PlayCircle, Award, CheckCircle, BookOpen, ChevronRight, FileText } from 'lucide-react';

export default function CourseDetailClient() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = COURSES.find((c) => c.id === courseId);
  const { enrolledCourseIds, enrollCourse, completedLessonIds, getCourseProgress, isLessonCompleted } = useLearning();

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Course Not Found</h2>
        <p className="text-slate-400">The course you are looking for does not exist or has been removed.</p>
        <Link href="/courses" className="inline-block px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const progressPct = getCourseProgress(course.id);
  // Resume at the first lesson the student has not finished yet.
  const startLesson = getNextLesson(course, completedLessonIds[course.id] || []);

  const handleEnrollAndStart = () => {
    enrollCourse(course.id);
  };

  return (
    <div className="pb-20 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-950 border-b border-slate-800 pt-10 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {/* Left Header Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-violet-950 text-violet-300 border border-violet-700/40">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {course.description}
              </p>

              {/* Course Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({course.reviewsCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-violet-400" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>{course.duration} total length</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="text-xs text-slate-400">Created by</div>
                  <div className="text-sm font-bold text-white">{course.instructor.name}</div>
                </div>
              </div>
            </div>

            {/* Right Course Card CTA Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-lg shadow-violet-600/40">
                    <PlayCircle className="w-8 h-8 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Course Tuition</span>
                  <span className="text-2xl font-black text-white">
                    {course.price === 0 ? <span className="text-emerald-400">Free Access</span> : course.priceLabel}
                  </span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                  Full Lifetime Access
                </span>
              </div>

              {/* Start Learning / Enroll Button */}
              {startLesson && (
                <Link
                  href={`/courses/${course.id}/learn?lesson=${startLesson.id}`}
                  onClick={handleEnrollAndStart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 shadow-xl shadow-violet-600/25 transition-all text-center"
                >
                  <PlayCircle className="w-5 h-5 fill-white" />
                  {progressPct === 100 ? 'Review Course' : isEnrolled && progressPct > 0 ? `Continue Learning (${progressPct}%)` : 'Start Learning'}
                </Link>
              )}

              <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> 100% Online & Self-Paced
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Certificate of Completion Included
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Diagnostic Knowledge Quiz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Curriculum & Overview */}
          <div className="lg:col-span-2 space-y-10">
            {/* Course Overview */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-violet-400" /> What You Will Learn
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                This course delivers practical hands-on exercises, structural architecture walkthroughs, and guided projects designed to prepare you for production software engineering challenges.
              </p>
            </div>

            {/* Curriculum Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
                <span className="text-xs font-semibold text-slate-400">
                  {course.modules.length} Modules • {course.modules.flatMap((m) => m.lessons).length} Lessons
                </span>
              </div>

              <div className="space-y-4">
                {course.modules.map((mod) => (
                  <div key={mod.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-violet-300">{mod.title}</h3>
                      <span className="text-xs text-slate-500 font-mono">{mod.lessons.length} Lessons</span>
                    </div>

                    <div className="divide-y divide-slate-800/60 pt-1">
                      {mod.lessons.map((les) => {
                        const done = isLessonCompleted(course.id, les.id);
                        return (
                          <Link
                            key={les.id}
                            href={`/courses/${course.id}/learn?lesson=${les.id}`}
                            className="py-3 flex items-center justify-between text-sm hover:bg-slate-800/40 -mx-2 px-2 rounded-lg transition"
                          >
                            <div className="flex items-center gap-3 text-slate-300">
                              {done ? (
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <PlayCircle className="w-4 h-4 text-violet-400" />
                              )}
                              <span>{les.title}</span>
                            </div>
                            <span className="text-xs text-slate-500 font-mono">{les.duration}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Callout Box */}
            {course.quiz && (
              <div className="bg-gradient-to-r from-violet-950/60 to-indigo-950/60 border border-violet-800/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded bg-violet-900/80 text-violet-300 text-xs font-bold uppercase">
                    Knowledge Evaluation
                  </div>
                  <h3 className="text-xl font-bold text-white">{course.quiz.title}</h3>
                  <p className="text-slate-300 text-xs">
                    Test your comprehension with 5 multiple-choice questions.
                  </p>
                </div>
                <Link
                  href={`/courses/${course.id}/quiz`}
                  className="shrink-0 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold shadow-lg shadow-violet-600/30 transition"
                >
                  Take Quiz
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Instructor Info & Metadata */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">About the Instructor</h3>
              <div className="flex items-center gap-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-violet-500/50"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{course.instructor.name}</h4>
                  <p className="text-xs text-violet-400">{course.instructor.role}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{course.instructor.bio}</p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800 text-slate-400">
                <div>
                  <span className="font-bold text-white block">{course.instructor.rating}</span> Instructor Rating
                </div>
                <div>
                  <span className="font-bold text-white block">{course.instructor.students.toLocaleString()}</span> Students
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
