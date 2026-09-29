'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Users, Clock, ArrowUpRight, Heart } from 'lucide-react';
import { Course } from '../types';
import { useLearning } from '../context/LearningContext';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { bookmarkedCourseIds, toggleBookmark } = useLearning();
  const isSaved = bookmarkedCourseIds.includes(course.id);

  return (
    <div className="group flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300">
      {/* Thumbnail Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        {/* Save for later */}
        <button
          type="button"
          onClick={() => toggleBookmark(course.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove ${course.title} from saved courses` : `Save ${course.title} for later`}
          title={isSaved ? 'Remove from saved' : 'Save for later'}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-slate-950/80 backdrop-blur border border-slate-700 hover:border-rose-400/60 transition"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-300'}`} />
        </button>

        {/* Category & Level Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur text-violet-400 border border-violet-500/30">
            {course.category}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/90 backdrop-blur text-slate-300 border border-slate-700">
            {course.level}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating & Duration */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1 font-semibold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal">({course.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Instructor & Metrics */}
        <div className="pt-3 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-6 h-6 rounded-full object-cover border border-slate-700"
              />
              <span className="text-slate-300 font-medium truncate max-w-[120px]">
                {course.instructor.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>

          {/* Footer Price & View Course Action */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-xs text-slate-400 block">Price</span>
              <span className="text-base font-extrabold text-white">
                {course.price === 0 ? (
                  <span className="text-emerald-400 font-bold">Free</span>
                ) : (
                  course.priceLabel
                )}
              </span>
            </div>

            <Link
              href={`/courses/${course.id}`}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/40 text-xs font-semibold transition-all group/btn"
            >
              View Course
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
