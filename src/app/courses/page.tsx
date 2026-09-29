'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { COURSES } from '@/data/courses';
import { CourseCard } from '@/components/CourseCard';
import { useLearning } from '@/context/LearningContext';
import { Search, Filter, RefreshCw, SlidersHorizontal, ArrowUpDown, Heart } from 'lucide-react';

export default function CourseCataloguePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [savedOnly, setSavedOnly] = useState(false);
  const { bookmarkedCourseIds } = useLearning();

  const categories = [
    'All',
    'Web Development',
    'Programming',
    'Data & AI',
    'Cybersecurity',
    'Cloud Computing',
    'Design'
  ];

  // Footer/nav links such as /courses?category=Data+%26+AI pre-select a category.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('category');
    if (requested && categories.includes(requested)) setSelectedCategory(requested);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const prices = ['All', 'Free', 'Paid'];

  /**
   * FIXED (was BUG 2): the category filter compared course.level to the selected
   * category, so picking "Web Development" matched nothing. It now compares
   * course.category.
   */
  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = COURSES.filter((course) => {
      // Search filter
      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.shortDescription.toLowerCase().includes(q) ||
        course.instructor.name.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Category filter
      if (selectedCategory !== 'All') {
        if (course.category !== selectedCategory) return false;
      }

      // Level filter
      if (selectedLevel !== 'All') {
        if (course.level !== selectedLevel) return false;
      }

      // Price filter
      if (selectedPrice !== 'All') {
        if (selectedPrice === 'Free' && course.price !== 0) return false;
        if (selectedPrice === 'Paid' && course.price === 0) return false;
      }

      // Saved-only filter
      if (savedOnly && !bookmarkedCourseIds.includes(course.id)) return false;

      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
      case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
      case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
      case 'title': sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: sorted.sort((a, b) => b.students - a.students); // most popular
    }
    return sorted;
  }, [searchQuery, selectedCategory, selectedLevel, selectedPrice, sortBy, savedOnly, bookmarkedCourseIds]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedPrice('All');
    setSortBy('popular');
    setSavedOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header Banner */}
      <div className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Course Catalogue
        </h1>
        <p className="text-slate-400 text-base max-w-2xl">
          Browse our collection of {COURSES.length} industry-grade courses built for practical skill mastery.
        </p>
      </div>

      {/* Category chips (target of the "Categories" nav link) */}
      <div id="categories" className="scroll-mt-24 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
              selectedCategory === cat
                ? 'bg-violet-600 text-white border-violet-500'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-violet-500/60 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by course title, instructor, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm transition"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Category Filter */}
          <div className="space-y-2">
            <label htmlFor="category-filter" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-violet-400" /> Category
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="space-y-2">
            <label htmlFor="level-filter" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" /> Level
            </label>
            <select
              id="level-filter"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <label htmlFor="price-filter" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              Price Type
            </label>
            <select
              id="price-filter"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition"
            >
              {prices.map((pr) => (
                <option key={pr} value={pr}>
                  {pr}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort & saved toggle row */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-2 min-w-[200px]">
            <label htmlFor="sort" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" /> Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition"
            >
              <option value="popular">Most popular</option>
              <option value="rating">Highest rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => setSavedOnly((v) => !v)}
            aria-pressed={savedOnly}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition ${
              savedOnly
                ? 'bg-rose-950/50 border-rose-700/60 text-rose-200'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Heart className={`w-4 h-4 ${savedOnly ? 'fill-rose-500 text-rose-500' : ''}`} />
            Saved ({bookmarkedCourseIds.length})
          </button>
        </div>

        {/* Filter Summary & Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredCourses.length}</strong> of {COURSES.length} courses
          </span>
          {(selectedCategory !== 'All' || selectedLevel !== 'All' || selectedPrice !== 'All' || searchQuery !== '' || savedOnly || sortBy !== 'popular') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-violet-400 hover:text-violet-300 font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No courses match your filter criteria</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            {savedOnly ? 'You have no saved courses that match. Tap the heart on a course card to save it.' : 'Try adjusting your search term, category, or level selection to discover available tech courses.'}
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
