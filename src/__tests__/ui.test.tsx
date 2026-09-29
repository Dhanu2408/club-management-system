// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, within, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const nav = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  pathname: '/',
  params: {} as Record<string, string>,
  search: '',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: nav.push, replace: nav.replace }),
  usePathname: () => nav.pathname,
  useParams: () => nav.params,
  useSearchParams: () => new URLSearchParams(nav.search),
}));

vi.mock('next/link', async () => {
  const R = await import('react');
  return {
    default: ({ href, children, ...rest }: any) => R.createElement('a', { href, ...rest }, children),
  };
});

import { LearningProvider } from '@/context/LearningContext';
import { Header } from '@/components/Header';
import { VideoPlayer } from '@/components/VideoPlayer';
import LoginPage from '@/app/login/page';
import CourseCataloguePage from '@/app/courses/page';
import LessonPlayerClient from '@/app/courses/[id]/learn/LessonPlayerClient';
import QuizClient from '@/app/courses/[id]/quiz/QuizClient';
import StudentDashboardPage from '@/app/dashboard/page';
import CertificateClient from '@/app/courses/[id]/certificate/CertificateClient';
import { COURSES } from '@/data/courses';

const STORAGE_KEY = 'skillforge:state:v1';
const app = (ui: React.ReactElement) => render(<LearningProvider>{ui}</LearningProvider>);
const course1 = COURSES.find((c) => c.id === 'course-1')!;

beforeEach(() => {
  window.localStorage.clear();
  nav.push.mockReset();
  nav.replace.mockReset();
  nav.pathname = '/';
  nav.params = {};
  nav.search = '';
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('BUG 7 - mobile navigation drawer', () => {
  it('hamburger button opens and closes the drawer', async () => {
    const user = userEvent.setup();
    app(<Header />);
    const btn = screen.getByRole('button', { name: 'Toggle Navigation Menu' });

    expect(btn.getAttribute('aria-expanded')).toBe('false');
    expect(document.getElementById('mobile-menu')).toBeNull();

    await user.click(btn);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    expect(document.getElementById('mobile-menu')).not.toBeNull();

    await user.click(btn);
    expect(document.getElementById('mobile-menu')).toBeNull();
  });
});

describe('BUG 3 - video Play button', () => {
  it('starts and pauses playback', async () => {
    const user = userEvent.setup();
    render(<VideoPlayer title="Demo" videoUrl="demo.mp4" />);

    await user.click(screen.getByRole('button', { name: 'Play Lesson Video' }));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Pause Lesson Video' })).toBeTruthy();

    await user.click(screen.getByRole('button', { name: 'Pause' }));
    expect(screen.getByRole('button', { name: 'Play Lesson Video' })).toBeTruthy();
  });

  it('the control-bar Play button works too, and Space toggles playback', async () => {
    const user = userEvent.setup();
    render(<VideoPlayer title="Demo" videoUrl="demo.mp4" />);

    await user.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Pause Lesson Video' })).toBeTruthy();

    (document.activeElement as HTMLElement | null)?.blur();
    await user.keyboard(' ');
    expect(screen.getByRole('button', { name: 'Play Lesson Video' })).toBeTruthy();
  });
});

describe('BUG 1 - login validation', () => {
  it('blocks an empty form and shows an error', async () => {
    const user = userEvent.setup();
    app(<LoginPage />);

    await user.click(screen.getByRole('button', { name: 'Log In' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Please provide both email and password.');
    expect(nav.push).not.toHaveBeenCalled();
  });

  it('blocks a missing password and an invalid email', async () => {
    const user = userEvent.setup();
    app(<LoginPage />);

    await user.type(screen.getByLabelText('Email Address'), 'student@skillforge.io');
    await user.click(screen.getByRole('button', { name: 'Log In' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Please provide both email and password.');

    await user.clear(screen.getByLabelText('Email Address'));
    await user.type(screen.getByLabelText('Email Address'), 'not-an-email');
    await user.type(screen.getByLabelText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Log In' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Please enter a valid email address.');
    expect(nav.push).not.toHaveBeenCalled();
  });

  it('logs in and goes to the dashboard with valid details', async () => {
    const user = userEvent.setup();
    app(<LoginPage />);

    await user.type(screen.getByLabelText('Email Address'), 'sam@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Log In' }));
    expect(nav.push).toHaveBeenCalledWith('/dashboard');
  });

  it('Create Account mode requires a name', async () => {
    const user = userEvent.setup();
    app(<LoginPage />);
    await user.click(screen.getByRole('button', { name: 'Create Account' }));
    await user.type(screen.getByLabelText('Email Address'), 'sam@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Create Account' }));
    expect((await screen.findByRole('alert')).textContent).toBe('Please enter your full name.');
  });
});

describe('BUG 2 - catalogue category filter', () => {
  it('shows exactly the courses in the chosen category', async () => {
    const user = userEvent.setup();
    app(<CourseCataloguePage />);

    await user.selectOptions(screen.getByLabelText('Category'), 'Web Development');

    const expected = COURSES.filter((c) => c.category === 'Web Development');
    expect(expected.length).toBeGreaterThan(0);
    for (const c of COURSES) {
      const el = screen.queryByText(c.title);
      if (c.category === 'Web Development') expect(el).not.toBeNull();
      else expect(el).toBeNull();
    }
  });

  it('category and level filters combine', async () => {
    const user = userEvent.setup();
    app(<CourseCataloguePage />);
    await user.selectOptions(screen.getByLabelText('Category'), 'Web Development');
    await user.selectOptions(screen.getByLabelText('Level'), 'Beginner');
    expect(screen.queryByText('Full Stack Web Development')).not.toBeNull();
    expect(screen.queryAllByText(/./, { selector: 'h3' }).length).toBe(
      COURSES.filter((c) => c.category === 'Web Development' && c.level === 'Beginner').length
    );
  });

  it('category chips and Reset Filters work', async () => {
    const user = userEvent.setup();
    app(<CourseCataloguePage />);
    await user.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.queryByText('Full Stack Web Development')).toBeNull();
    await user.click(screen.getByRole('button', { name: /Reset Filters/ }));
    expect(screen.queryByText('Full Stack Web Development')).not.toBeNull();
  });
});

describe('BUG 6 - Next Lesson', () => {
  beforeEach(() => {
    nav.params = { id: 'course-1' };
    nav.pathname = '/courses/course-1/learn';
  });

  it('opens the very next lesson (index + 1), not index + 2', async () => {
    nav.search = 'lesson=les-1-1-1';
    const user = userEvent.setup();
    app(<LessonPlayerClient />);
    await user.click(screen.getByRole('button', { name: /Next Lesson/ }));
    expect(nav.replace).toHaveBeenCalledWith('/courses/course-1/learn?lesson=les-1-1-2', { scroll: false });
  });

  it('works mid-course and Previous goes back one', async () => {
    nav.search = 'lesson=les-1-1-3';
    const user = userEvent.setup();
    app(<LessonPlayerClient />);
    await user.click(screen.getByRole('button', { name: /Next Lesson/ }));
    expect(nav.replace).toHaveBeenLastCalledWith('/courses/course-1/learn?lesson=les-1-2-1', { scroll: false });
    await user.click(screen.getByRole('button', { name: /Previous Lesson/ }));
    expect(nav.replace).toHaveBeenLastCalledWith('/courses/course-1/learn?lesson=les-1-1-2', { scroll: false });
  });

  it('Next is disabled on the last lesson', () => {
    nav.search = 'lesson=les-1-2-2';
    app(<LessonPlayerClient />);
    expect((screen.getByRole('button', { name: /Next Lesson/ }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('Mark as Complete saves progress to the browser', async () => {
    nav.search = 'lesson=les-1-1-2';
    const user = userEvent.setup();
    app(<LessonPlayerClient />);
    await user.click(screen.getByRole('button', { name: /Mark as Complete/ }));
    expect(screen.getByRole('button', { name: /Marked as Complete/ })).toBeTruthy();
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!);
    expect(saved.completedLessonIds['course-1']).toContain('les-1-1-2');
  });
});

describe('BUG 5 - quiz score', () => {
  it('4 correct out of 5 shows 80%', async () => {
    nav.params = { id: 'course-1' };
    const user = userEvent.setup();
    app(<QuizClient />);

    const qs = course1.quiz.questions;
    for (let i = 0; i < qs.length; i++) {
      const card = screen.getByText(qs[i].question).parentElement!.parentElement!;
      const pick = i === 4 ? (qs[i].correctAnswer + 1) % qs[i].options.length : qs[i].correctAnswer;
      await user.click(within(card).getByText(qs[i].options[pick]));
    }
    await user.click(screen.getByRole('button', { name: 'Submit Quiz' }));

    expect(screen.getByText('80%')).toBeTruthy();
    expect(screen.getByText('Quiz Passed!')).toBeTruthy();
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!);
    expect(saved.quizScores['course-1']).toBe(80);
  });

  it('Submit stays disabled until every question is answered', () => {
    nav.params = { id: 'course-1' };
    app(<QuizClient />);
    expect((screen.getByRole('button', { name: 'Submit Quiz' }) as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('BUG 4 - dashboard progress', () => {
  it('uses each course\'s real lesson count (1/5 = 20%, 1/2 = 50%, 1/1 = 100%)', async () => {
    app(<StudentDashboardPage />);
    expect(await screen.findByText('20%')).toBeTruthy(); // course-1: 1 of 5 lessons
    expect(screen.getByText('50%')).toBeTruthy(); // course-2: 1 of 2
    expect(screen.getByText('100%')).toBeTruthy(); // course-7: 1 of 1
  });

  it('progress rises as lessons are completed (2/5 = 40%)', async () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        enrolledCourseIds: ['course-1'],
        completedLessonIds: { 'course-1': ['les-1-1-1', 'les-1-1-2'] },
      })
    );
    app(<StudentDashboardPage />);
    expect(await screen.findByText('40%')).toBeTruthy();
  });

  it('asks a logged-out student to log in', async () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: null, isLoggedIn: false }));
    app(<StudentDashboardPage />);
    expect(await screen.findByText('Please log in')).toBeTruthy();
  });
});

describe('Certificate (new feature)', () => {
  beforeEach(() => {
    nav.params = { id: 'course-1' };
  });

  it('is locked until all lessons are done and the quiz is passed', async () => {
    app(<CertificateClient />);
    expect(await screen.findByText('Certificate locked')).toBeTruthy();
  });

  it('unlocks with 100% progress and a passing score', async () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        user: { name: 'Sam', email: 'sam@example.com' },
        completedLessonIds: { 'course-1': course1.modules.flatMap((m) => m.lessons).map((l) => l.id) },
        quizScores: { 'course-1': 85 },
      })
    );
    app(<CertificateClient />);
    expect(await screen.findByText('Certificate of Completion')).toBeTruthy();
    expect(screen.getByText('Sam')).toBeTruthy();
  });
});
