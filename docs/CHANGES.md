# SkillForge – Bug Fixes & New Features

## The 7 bugs found (and fixed)
| # | File | Problem | Fix |
|---|------|---------|-----|
| 1 | `src/app/login/page.tsx` | Login accepted empty email/password | Validates trimmed email + password, shows error, blocks submit |
| 2 | `src/app/courses/page.tsx` | Category filter compared `course.level` instead of `course.category` | Filters by `course.category` |
| 3 | `src/components/VideoPlayer.tsx` | Play button always set `isPlaying=false` | Toggles play/pause correctly |
| 4 | `src/context/LearningContext.tsx` | Progress divided by hardcoded 100 lessons | Uses the course's real lesson count (`src/lib/progress.ts`) |
| 5 | `src/app/courses/[id]/quiz/QuizClient.tsx` | Score divided by `questions * 4` | `round(correct / total * 100)` |
| 6 | `src/app/courses/[id]/learn/LessonPlayerClient.tsx` | Next Lesson skipped one (`index + 2`) | Goes to `index + 1` |
| 7 | `src/components/Header.tsx` | Mobile menu button never opened the menu | Toggles `isMobileMenuOpen` |

Also fixed: placeholder `#` links on resources/login pages now navigate properly.

## New features
- Shared, unit-tested progress/scoring module (`src/lib/progress.ts`, 17 tests)
- Persisted learning state (progress survives refresh)
- Rebuilt video player with error handling and retry
- URL-based lesson tracking, lesson notes, auto-advance
- Real dashboard stats and "Continue learning" resume link
- Completion certificate page per course
- SkillForge branding with new Hero section

## Run it
    npm install
    npm run dev        # http://localhost:3000
    npm run build      # static export in /out
    npm test           # unit tests
