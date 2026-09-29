import Link from 'next/link';
import type { ElementType } from 'react';
import { COURSES } from '@/data/courses';
import { Hero } from '@/components/Hero';
import { CourseCard } from '@/components/CourseCard';
import {
  ArrowRight, BookOpen, Brain, Cloud, Code2, GraduationCap, Layers, Palette, ShieldCheck, Terminal, Users, PlayCircle, Award,
} from 'lucide-react';

const CATEGORY_META: { name: string; icon: ElementType; color: string }[] = [
  { name: 'Web Development', icon: Code2, color: 'text-violet-400 bg-violet-600/20 border-violet-500/30' },
  { name: 'Programming', icon: Terminal, color: 'text-indigo-400 bg-indigo-600/20 border-indigo-500/30' },
  { name: 'Data & AI', icon: Brain, color: 'text-cyan-400 bg-cyan-600/20 border-cyan-500/30' },
  { name: 'Cybersecurity', icon: ShieldCheck, color: 'text-rose-400 bg-rose-600/20 border-rose-500/30' },
  { name: 'Cloud Computing', icon: Cloud, color: 'text-sky-400 bg-sky-600/20 border-sky-500/30' },
  { name: 'Design', icon: Palette, color: 'text-amber-400 bg-amber-600/20 border-amber-500/30' },
];

const STEPS = [
  { icon: BookOpen, title: 'Pick a course', desc: 'Browse the catalogue, filter by category and level, and save favourites for later.' },
  { icon: PlayCircle, title: 'Learn at your pace', desc: 'Watch video lessons, take notes, and resume exactly where you stopped.' },
  { icon: Award, title: 'Prove your skills', desc: 'Pass the course quiz and finish every lesson to earn a printable certificate.' },
];

export default function HomePage() {
  const featured = [...COURSES].sort((a, b) => b.students - a.students).slice(0, 3);
  const totalLessons = COURSES.reduce((n, c) => n + c.modules.flatMap((m) => m.lessons).length, 0);
  const totalStudents = COURSES.reduce((n, c) => n + c.students, 0);

  const stats = [
    { icon: Layers, value: COURSES.length, label: 'Courses' },
    { icon: PlayCircle, value: totalLessons, label: 'Video lessons' },
    { icon: Users, value: `${Math.round(totalStudents / 1000)}K+`, label: 'Enrolments' },
    { icon: GraduationCap, value: COURSES.length, label: 'Quizzes & certificates' },
  ];

  return (
    <div>
      <Hero />

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-black text-white">{s.value}</div>
                <div className="text-xs text-slate-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Most popular courses</h2>
            <p className="text-sm text-slate-400">Chosen by thousands of learners.</p>
          </div>
          <Link href="/courses" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-violet-400 hover:text-violet-300 transition">
            View all courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        <h2 className="text-3xl font-extrabold text-white">Explore by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORY_META.map(({ name, icon: Icon, color }) => {
            const count = COURSES.filter((c) => c.category === name).length;
            return (
              <Link
                key={name}
                href={`/courses?category=${encodeURIComponent(name).replace(/%20/g, '+')}`}
                className="group bg-slate-900 border border-slate-800 hover:border-violet-500/50 rounded-2xl p-5 flex items-center gap-4 transition"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate group-hover:text-violet-300 transition">{name}</div>
                  <div className="text-xs text-slate-400">{count} {count === 1 ? 'course' : 'courses'}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <h2 className="text-3xl font-extrabold text-white text-center">How SkillForge works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">Step {i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white">Ready to build skills that matter?</h2>
        <p className="text-slate-400 text-sm">Start with a free course today and track your progress from your dashboard.</p>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 shadow-xl shadow-violet-600/25 transition"
        >
          Browse the catalogue <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
