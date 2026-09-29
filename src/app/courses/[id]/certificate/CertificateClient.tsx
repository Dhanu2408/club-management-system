'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { useLearning } from '@/context/LearningContext';
import { PASS_MARK } from '@/lib/progress';
import { Award, CheckCircle2, ChevronLeft, Circle, Printer } from 'lucide-react';

export default function CertificateClient() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = COURSES.find((c) => c.id === courseId);
  const { isHydrated, user, getCourseProgress, quizScores } = useLearning();
  const [issuedOn, setIssuedOn] = useState<string>('');

  // Date is set on the client so it matches the student's real "today".
  useEffect(() => {
    setIssuedOn(
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    );
  }, []);

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Course Not Found</h2>
        <Link href="/courses" className="inline-block px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  if (!isHydrated) {
    return <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-400">Loading…</div>;
  }

  const progress = getCourseProgress(course.id);
  const best = quizScores[course.id];
  const lessonsDone = progress === 100;
  const quizPassed = best !== undefined && best >= PASS_MARK;

  if (!lessonsDone || !quizPassed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-6">
        <Link href={`/courses/${course.id}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition">
          <ChevronLeft className="w-4 h-4" /> Back to Course
        </Link>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5 shadow-xl">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-violet-400" />
            <h1 className="text-2xl font-bold text-white">Certificate locked</h1>
          </div>
          <p className="text-sm text-slate-400">Finish these two steps to earn your certificate for {course.title}.</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-slate-200">
              {lessonsDone ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-slate-600" />}
              Complete all lessons ({progress}% done)
            </li>
            <li className="flex items-center gap-2 text-slate-200">
              {quizPassed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-slate-600" />}
              Pass the course quiz with {PASS_MARK}% or more{best !== undefined ? ` (best so far: ${best}%)` : ''}
            </li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            {!lessonsDone && (
              <Link href={`/courses/${course.id}/learn`} className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition">
                Continue lessons
              </Link>
            )}
            {!quizPassed && (
              <Link href={`/courses/${course.id}/quiz`} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition">
                Take the quiz
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  const studentName = user?.name || 'SkillForge Student';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 print:p-0">
      <div className="flex items-center justify-between print:hidden">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      <div className="bg-white text-slate-900 rounded-2xl border-[10px] border-double border-violet-700 p-10 sm:p-14 text-center space-y-6 shadow-2xl print:shadow-none print:rounded-none">
        <div className="flex items-center justify-center gap-2 text-violet-700 font-black tracking-widest text-sm">
          <Award className="w-6 h-6" /> SKILLFORGE
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Certificate of Completion</h1>
        <p className="text-slate-500 text-sm">This certifies that</p>
        <p className="text-3xl sm:text-4xl font-extrabold text-violet-800 border-b-2 border-slate-200 inline-block px-6 pb-2">
          {studentName}
        </p>
        <p className="text-slate-500 text-sm">has successfully completed the course</p>
        <p className="text-xl sm:text-2xl font-bold">{course.title}</p>
        <p className="text-sm text-slate-600">
          with a final quiz score of <strong>{best}%</strong>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-500">
          <div>
            <div className="font-bold text-slate-800">{issuedOn || '—'}</div>
            Date issued
          </div>
          <div>
            <div className="font-bold text-slate-800">{course.instructor.name}</div>
            {course.instructor.role}
          </div>
          <div>
            <div className="font-mono font-bold text-slate-800">SF-{course.id.toUpperCase()}</div>
            Certificate reference
          </div>
        </div>
      </div>
    </div>
  );
}
