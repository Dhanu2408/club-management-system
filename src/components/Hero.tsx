'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Sparkles, CheckCircle2, ShieldCheck, Users, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-slate-950 pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/30 via-indigo-500/20 to-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/80 border border-violet-700/40 text-violet-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Tech Odyssey 2026 Platform</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none">
            BUILD SKILLS <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400">
              THAT MATTER.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            Learn modern technology through practical courses, guided projects and hands-on challenges.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 shadow-xl shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-0.5 transition-all"
            >
              Explore Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all"
            >
              <Play className="w-4 h-4 text-violet-400 fill-violet-400" />
              Start Learning
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left border-t border-slate-800/80 mt-10">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/60">
              <div className="p-2 rounded-md bg-violet-900/40 text-violet-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Expert-Led</div>
                <div className="text-xs text-slate-400">Industry Practitioners</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/60">
              <div className="p-2 rounded-md bg-indigo-900/40 text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">100K+ Students</div>
                <div className="text-xs text-slate-400">Active Community</div>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800/60">
              <div className="p-2 rounded-md bg-blue-900/40 text-blue-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Hands-on Quizzes</div>
                <div className="text-xs text-slate-400">Real Evaluation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
