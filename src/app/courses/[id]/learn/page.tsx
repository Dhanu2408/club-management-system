import { Suspense } from 'react';
import { COURSES } from '@/data/courses';
import LessonPlayerClient from './LessonPlayerClient';

export function generateStaticParams() {
  return COURSES.map((course) => ({
    id: course.id,
  }));
}

export default function LessonPlayerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading lesson...</div>}>
      <LessonPlayerClient />
    </Suspense>
  );
}
