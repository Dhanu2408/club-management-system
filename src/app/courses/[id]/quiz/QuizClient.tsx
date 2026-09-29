'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { COURSES } from '@/data/courses';
import { useLearning } from '@/context/LearningContext';
import { PASS_MARK, QuizResult, calculateQuizScore } from '@/lib/progress';
import { Award, ChevronLeft, RefreshCw, ArrowRight, CheckCircle2, XCircle, GraduationCap } from 'lucide-react';

export default function QuizClient() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = COURSES.find((c) => c.id === courseId);
  const quiz = course?.quiz;

  const { saveQuizScore, quizScores, getCourseProgress } = useLearning();

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<QuizResult | null>(null);

  if (!course || !quiz) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Quiz Not Found</h2>
        <p className="text-slate-400">This course does not have an active diagnostic quiz.</p>
        <Link href={`/courses/${courseId}`} className="inline-block px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-semibold">
          Return to Course
        </Link>
      </div>
    );
  }

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  /**
   * FIXED (was BUG 5): the percentage used to divide by (totalQuestions * 4),
   * so 4 correct out of 5 showed 20%. It is now correct / total * 100 (= 80%).
   * The maths lives in src/lib/progress.ts and is covered by unit tests.
   */
  const handleSubmitQuiz = () => {
    const result = calculateQuizScore(quiz.questions, selectedAnswers);
    setScoreResult(result);
    setIsSubmitted(true);
    saveQuizScore(course.id, result.percentage);
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScoreResult(null);
  };

  const optionLabels = ['A', 'B', 'C', 'D'];
  const answeredCount = Object.keys(selectedAnswers).length;
  const bestScore = quizScores[course.id];
  const courseProgress = getCourseProgress(course.id);
  const certificateReady = !!scoreResult?.passed && courseProgress === 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Quiz Header */}
      <div className="space-y-4">
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Course Page
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
          <span className="px-3 py-1 rounded bg-violet-950 text-violet-300 border border-violet-800/40 text-xs font-bold uppercase tracking-wider">
            Diagnostic Knowledge Check
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{quiz.title}</h1>
          <p className="text-sm text-slate-400">
            Select the single best answer for each of the {quiz.questions.length} questions below.
            You need {PASS_MARK}% to pass.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-semibold">
              Answered {answeredCount} / {quiz.questions.length}
            </span>
            {bestScore !== undefined && (
              <span className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 font-semibold">
                Best score: {bestScore}%
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all"
              style={{ width: `${(answeredCount / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.questions.map((q, qIdx) => {
          const selectedOption = selectedAnswers[qIdx];

          return (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-violet-600/20 text-violet-300 font-bold text-xs flex items-center justify-center shrink-0 border border-violet-500/30">
                  {qIdx + 1}
                </span>
                <h3 className="text-base font-bold text-white pt-0.5 leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  let borderStyle = 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300';

                  if (isSelected) {
                    borderStyle = 'border-violet-500 bg-violet-600/20 text-white font-semibold';
                  }

                  if (isSubmitted) {
                    if (optIdx === q.correctAnswer) {
                      borderStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200 font-semibold';
                    } else if (isSelected && optIdx !== q.correctAnswer) {
                      borderStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(qIdx, optIdx)}
                      disabled={isSubmitted}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left text-sm transition ${borderStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-violet-600 text-white'
                            : 'bg-slate-900 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {optionLabels[optIdx] || optIdx + 1}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit / Results Bar */}
      {!isSubmitted ? (
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSubmitQuiz}
            disabled={answeredCount < quiz.questions.length}
            className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-violet-600/25 transition"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-violet-500/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center mx-auto text-violet-400">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">
              {scoreResult?.passed ? 'Quiz Passed!' : 'Quiz Complete'}
            </h2>
            <p className={`inline-flex items-center gap-1.5 text-xs font-bold ${scoreResult?.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
              {scoreResult?.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              {scoreResult?.passed ? `You reached the ${PASS_MARK}% pass mark.` : `You need ${PASS_MARK}% to pass. Review the green answers and try again.`}
            </p>
            <p className="text-sm text-slate-300">
              You answered <strong className="text-white">{scoreResult?.correctCount}</strong> out of{' '}
              <strong className="text-white">{scoreResult?.totalQuestions}</strong> questions correctly.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 max-w-sm mx-auto">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block mb-1">
              Final Computed Score
            </span>
            <span className="text-4xl font-black text-violet-400">{scoreResult?.percentage}%</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleRetakeQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition"
            >
              <RefreshCw className="w-4 h-4" /> Retake Quiz
            </button>
            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition"
            >
              Back to Course <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {scoreResult?.passed && (
            certificateReady ? (
              <Link
                href={`/courses/${course.id}/certificate`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition"
              >
                <GraduationCap className="w-4 h-4" /> View your certificate
              </Link>
            ) : (
              <p className="text-xs text-slate-400">
                Finish every lesson ({courseProgress}% done) to unlock your certificate.
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
