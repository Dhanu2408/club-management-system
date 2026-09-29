export type Lesson = {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  completed?: boolean;
  description?: string;
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export type Quiz = {
  id: string;
  title: string;
  questions: Question[];
};

export type Instructor = {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  rating: number;
  students: number;
  coursesCount: number;
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: Instructor;
  rating: number;
  reviewsCount: number;
  students: number;
  duration: string;
  price: number;
  priceLabel: string;
  image: string;
  modules: Module[];
  quiz: Quiz;
};

export type UserProgress = {
  enrolledCourseIds: string[];
  completedLessonIds: Record<string, string[]>;
  quizScores: Record<string, number>;
};
