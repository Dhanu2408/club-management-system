import { describe, it, expect } from 'vitest';
import { COURSES } from '../../data/courses';
import {
  PASS_MARK,
  calculateCourseProgress,
  calculateQuizScore,
  calculateStreak,
  formatMinutes,
  getAllLessons,
  getNextLesson,
  parseDurationToMinutes,
} from '../progress';

const course1 = COURSES.find((c) => c.id === 'course-1')!;
const lessons1 = getAllLessons(course1);

describe('calculateCourseProgress (dashboard progress bug)', () => {
  it('is 0 with nothing completed', () => {
    expect(calculateCourseProgress(course1, [])).toBe(0);
  });

  it('divides by the real lesson count of the course, not a hardcoded 100', () => {
    // course-1 has 5 lessons -> 1 done = 20%, 2 done = 40%
    expect(lessons1).toHaveLength(5);
    expect(calculateCourseProgress(course1, [lessons1[0].id])).toBe(20);
    expect(calculateCourseProgress(course1, [lessons1[0].id, lessons1[1].id])).toBe(40);
  });

  it('reaches exactly 100% when every lesson is done', () => {
    expect(calculateCourseProgress(course1, lessons1.map((l) => l.id))).toBe(100);
  });

  it('ignores unknown / duplicate ids and never exceeds 100', () => {
    const ids = [...lessons1.map((l) => l.id), lessons1[0].id, 'ghost-lesson'];
    expect(calculateCourseProgress(course1, ids)).toBe(100);
  });

  it('handles a missing course', () => {
    expect(calculateCourseProgress(undefined, ['x'])).toBe(0);
  });
});

describe('calculateQuizScore (quiz score bug)', () => {
  const qs = course1.quiz.questions;

  it('scores 4 of 5 correct as 80% (was 20%)', () => {
    const answers: Record<number, number> = {};
    qs.forEach((q, i) => (answers[i] = q.correctAnswer));
    answers[4] = (qs[4].correctAnswer + 1) % qs[4].options.length; // make one wrong
    const r = calculateQuizScore(qs, answers);
    expect(r.correctCount).toBe(4);
    expect(r.totalQuestions).toBe(5);
    expect(r.percentage).toBe(80);
    expect(r.passed).toBe(true);
  });

  it('scores all correct as 100% and none correct as 0%', () => {
    const all: Record<number, number> = {};
    qs.forEach((q, i) => (all[i] = q.correctAnswer));
    expect(calculateQuizScore(qs, all).percentage).toBe(100);
    expect(calculateQuizScore(qs, {}).percentage).toBe(0);
    expect(calculateQuizScore(qs, {}).passed).toBe(false);
  });

  it('applies the pass mark', () => {
    expect(PASS_MARK).toBe(70);
    const three: Record<number, number> = { 0: qs[0].correctAnswer, 1: qs[1].correctAnswer, 2: qs[2].correctAnswer };
    expect(calculateQuizScore(qs, three).percentage).toBe(60);
    expect(calculateQuizScore(qs, three).passed).toBe(false);
  });

  it('does not divide by zero for an empty quiz', () => {
    expect(calculateQuizScore([], {}).percentage).toBe(0);
  });
});

describe('getNextLesson', () => {
  it('returns the first incomplete lesson', () => {
    expect(getNextLesson(course1, [lessons1[0].id])?.id).toBe(lessons1[1].id);
  });
  it('falls back to lesson 1 when everything is complete', () => {
    expect(getNextLesson(course1, lessons1.map((l) => l.id))?.id).toBe(lessons1[0].id);
  });
});

describe('duration helpers', () => {
  it('parses durations', () => {
    expect(parseDurationToMinutes('14 min')).toBe(14);
    expect(parseDurationToMinutes('1 hr 30 min')).toBe(90);
    expect(parseDurationToMinutes('2 hours')).toBe(120);
    expect(parseDurationToMinutes('n/a')).toBe(0);
  });
  it('formats minutes', () => {
    expect(formatMinutes(45)).toBe('45 min');
    expect(formatMinutes(120)).toBe('2 hr');
    expect(formatMinutes(135)).toBe('2 hr 15 min');
  });
});

describe('calculateStreak', () => {
  const today = new Date(2026, 8, 29); // 29 Sep 2026
  it('counts consecutive days ending today', () => {
    expect(calculateStreak(['2026-09-29', '2026-09-28', '2026-09-27'], today)).toBe(3);
  });
  it('keeps the streak alive if the last activity was yesterday', () => {
    expect(calculateStreak(['2026-09-28', '2026-09-27'], today)).toBe(2);
  });
  it('breaks after a gap and is 0 with no activity', () => {
    expect(calculateStreak(['2026-09-29', '2026-09-26'], today)).toBe(1);
    expect(calculateStreak([], today)).toBe(0);
    expect(calculateStreak(['2026-09-20'], today)).toBe(0);
  });
});

describe('course data integrity', () => {
  it('every quiz answer index is valid and lesson ids are unique', () => {
    const seen = new Set<string>();
    for (const c of COURSES) {
      for (const q of c.quiz.questions) {
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(q.options.length);
      }
      for (const l of getAllLessons(c)) {
        expect(seen.has(l.id)).toBe(false);
        seen.add(l.id);
      }
    }
  });
});
