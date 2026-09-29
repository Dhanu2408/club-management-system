'use client';

import React from 'react';
import { Module, Lesson } from '../types';
import { CheckCircle, PlayCircle, Lock } from 'lucide-react';
import { useLearning } from '../context/LearningContext';

interface CurriculumSidebarProps {
  courseId: string;
  modules: Module[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
}

export const CurriculumSidebar: React.FC<CurriculumSidebarProps> = ({
  courseId,
  modules,
  currentLessonId,
  onSelectLesson
}) => {
  const { isLessonCompleted } = useLearning();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
      <h3 className="text-lg font-bold text-white px-2">Course Curriculum</h3>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
        {modules.map((module) => (
          <div key={module.id} className="space-y-2">
            <div className="text-xs font-bold text-violet-400 uppercase tracking-wider px-2 pt-2 border-t border-slate-800/80">
              {module.title}
            </div>

            <div className="space-y-1">
              {module.lessons.map((lesson) => {
                const active = lesson.id === currentLessonId;
                const completed = isLessonCompleted(courseId, lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                      active
                        ? 'bg-violet-600 text-white font-semibold shadow-md shadow-violet-600/20'
                        : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300 border border-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {completed ? (
                        <CheckCircle className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-emerald-400'}`} />
                      ) : (
                        <PlayCircle className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-violet-400'}`} />
                      )}
                      <span className="text-xs sm:text-sm truncate">{lesson.title}</span>
                    </div>
                    <span
                      className={`text-[11px] font-mono shrink-0 ml-2 ${
                        active ? 'text-violet-200' : 'text-slate-500'
                      }`}
                    >
                      {lesson.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
