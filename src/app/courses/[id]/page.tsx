import { COURSES } from '@/data/courses';
import CourseDetailClient from './CourseDetailClient';

export function generateStaticParams() {
  return COURSES.map((course) => ({
    id: course.id,
  }));
}

export default function CourseDetailPage() {
  return <CourseDetailClient />;
}
