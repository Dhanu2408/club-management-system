# TECH ODYSSEY 2026 — TECH EMERGENCY ROOM
## ROUND 2 WEBSITE #2: SKILLFORGE (ONLINE LEARNING DEBUGGING CHALLENGE)
### ORGANIZER BUG MAP (CONFIDENTIAL — DO NOT PUBLISH TO PARTICIPANTS)

---

### BUG-01
**Feature:** Login Form Validation  
**Expected:** Email and password are required. Submitting the login form with empty fields should block submission and display a validation error message.  
**Actual:** The Login button allows submission even when email and password fields are completely empty.  
**Likely root cause:** In `src/app/login/page.tsx`, `handleSubmit` skips the empty input validation check and directly invokes `login(email, password)` and `router.push('/dashboard')`.  
**How to reproduce:** Navigate to `/login`, leave Email and Password fields empty, and click "Log In". Observe that the user is logged in and redirected to the dashboard without validation error.  
**Expected fix:** In `src/app/login/page.tsx`, restore the validation check in `handleSubmit`:
```tsx
if (!email.trim() || !password.trim()) {
  setError('Please provide both email and password.');
  return;
}
```

---

### BUG-02
**Feature:** Course Catalogue Filtering  
**Expected:** Selecting a category filter (e.g. "Web Development") should filter courses matching `course.category === selectedCategory`.  
**Actual:** Selecting a category filter returns incorrect courses or no courses at all.  
**Likely root cause:** In `src/app/courses/page.tsx`, the `useMemo` category filter compares `course.level === selectedCategory` instead of `course.category === selectedCategory`.  
**How to reproduce:** Navigate to `/courses`, select Category "Web Development". Observe that no courses or wrong courses are displayed because category is checked against course difficulty level.  
**Expected fix:** In `src/app/courses/page.tsx`, update the category comparison in `filteredCourses`:
```tsx
if (selectedCategory !== 'All') {
  if (course.category !== selectedCategory) return false;
}
```

---

### BUG-03
**Feature:** Video Lesson Player Playback  
**Expected:** Clicking the Play button on the video player should toggle playback state (`isPlaying = true`) and start playing the video lesson.  
**Actual:** Clicking the Play button fails to trigger playback state.  
**Likely root cause:** In `src/components/VideoPlayer.tsx`, the `handlePlayPause` click handler sets `setIsPlaying(false)` instead of `setIsPlaying(!isPlaying)`.  
**How to reproduce:** Navigate to any lesson player screen (e.g. `/courses/course-1/learn`), click the center Play button or control bar Play button. Observe that video playback does not activate.  
**Expected fix:** In `src/components/VideoPlayer.tsx`, update `handlePlayPause`:
```tsx
const handlePlayPause = () => {
  setIsPlaying(!isPlaying);
};
```

---

### BUG-04
**Feature:** Student Dashboard Course Progress Calculation  
**Expected:** Completing lessons should dynamically update and increase displayed course progress percentage on the student dashboard (`completedLessons / totalLessons * 100`).  
**Actual:** Completing lessons does not correctly update the displayed course progress, leaving it stale/incorrect.  
**Likely root cause:** In `src/context/LearningContext.tsx`, `getCourseProgress` calculates percentage by dividing completed lessons length by a hardcoded denominator of `100` (`completedList.length / 100 * 100`) instead of calculating against total lessons in the course (`course.modules.flatMap(m => m.lessons).length`).  
**How to reproduce:** In lesson player (`/courses/course-1/learn`), click "Mark as Complete" on multiple lessons, then navigate to `/dashboard`. Observe that the course progress percentage displays an incorrect value (e.g. 1-2%).  
**Expected fix:** In `src/context/LearningContext.tsx`, update `getCourseProgress`:
```tsx
const getCourseProgress = (courseId: string): number => {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return 0;
  const completedList = completedLessonIds[courseId] || [];
  const totalLessons = course.modules.flatMap(m => m.lessons).length;
  if (totalLessons === 0) return 0;
  return Math.round((completedList.length / totalLessons) * 100);
};
```

---

### BUG-05
**Feature:** Course Quiz Score Calculation  
**Expected:** Quiz score percentage should equal `(correctAnswersCount / totalQuestionsCount) * 100` (e.g. 4 correct out of 5 questions = 80%).  
**Actual:** The calculated score percentage is completely incorrect (e.g. 4 correct out of 5 questions displays 20%).  
**Likely root cause:** In `src/app/courses/[id]/quiz/page.tsx`, `handleSubmitQuiz` computes percentage by dividing `correctCount` by `(totalQuestions * 4)` instead of `totalQuestions`.  
**How to reproduce:** Take a course quiz (e.g. `/courses/course-1/quiz`), select 4 correct answers out of 5 questions, click Submit Quiz. Observe that the computed final score percentage reads 20% instead of 80%.  
**Expected fix:** In `src/app/courses/[id]/quiz/page.tsx`, update `handleSubmitQuiz`:
```tsx
const percentage = Math.round((correctCount / totalQuestions) * 100);
```

---

### BUG-06
**Feature:** Sequential Lesson Navigation  
**Expected:** Clicking "Next Lesson" from Lesson 1 should open Lesson 2 (`currentIndex + 1`).  
**Actual:** Clicking "Next Lesson" opens Lesson 3 (`currentIndex + 2`), skipping Lesson 2.  
**Likely root cause:** In `src/app/courses/[id]/learn/page.tsx`, `handleNextLesson` increments `currentIndex` by 2 (`currentIndex + 2`) instead of 1 (`currentIndex + 1`).  
**How to reproduce:** Open Lesson 1 in the lesson player (`/courses/course-1/learn`), click the "Next Lesson" button. Observe that Lesson 3 opens instead of Lesson 2.  
**Expected fix:** In `src/app/courses/[id]/learn/page.tsx`, update `handleNextLesson`:
```tsx
const handleNextLesson = () => {
  if (currentIndex < allLessons.length - 1) {
    const nextLesson = allLessons[currentIndex + 1];
    setCurrentLesson(nextLesson);
  }
};
```

---

### BUG-07
**Feature:** Mobile Navigation Drawer Toggle  
**Expected:** On mobile viewports (<768px), clicking the hamburger menu button should toggle open/close the mobile navigation drawer.  
**Actual:** Clicking the hamburger menu button fails to open the mobile navigation menu.  
**Likely root cause:** In `src/components/Header.tsx`, `toggleMobileMenu` sets `setIsMobileMenuOpen(false)` instead of `setIsMobileMenuOpen(!isMobileMenuOpen)`.  
**How to reproduce:** Resize the browser window to mobile width (<768px), click the hamburger icon in the top navigation bar. Observe that the mobile menu drawer does not open.  
**Expected fix:** In `src/components/Header.tsx`, update `toggleMobileMenu`:
```tsx
const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};
```
