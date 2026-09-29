import { COURSES } from '@/data/courses';
import QuizClient from './QuizClient';

export function generateStaticParams() {
  return COURSES.map((course) => ({
    id: course.id,
  }));
}

export default function QuizPage() {
  return <QuizClient />;
}
