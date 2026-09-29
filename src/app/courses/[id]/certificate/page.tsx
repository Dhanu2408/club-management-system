import { COURSES } from '@/data/courses';
import CertificateClient from './CertificateClient';

export function generateStaticParams() {
  return COURSES.map((course) => ({
    id: course.id,
  }));
}

export default function CertificatePage() {
  return <CertificateClient />;
}
