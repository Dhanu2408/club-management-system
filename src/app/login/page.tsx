'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLearning } from '../../context/LearningContext';
import { BookOpen, Mail, Lock, ArrowRight, CheckSquare, Square, Eye, EyeOff, User, Info } from 'lucide-react';

const REMEMBER_KEY = 'skillforge:remembered-email';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useLearning();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  // Pre-fill the email if the student chose "Remember me" last time.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        setEmail(saved);
        setRememberMe(true);
      }
    } catch {
      /* storage unavailable: ignore */
    }
  }, []);

  const isRegister = mode === 'register';

  /**
   * FIXED (was BUG 1): the empty-field validation had been commented out, so
   * submitting a blank form logged the user in. It is restored below, with
   * extra checks for a valid email format (and a longer password when registering).
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice('');

    if (isRegister && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (isRegister && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    try {
      if (rememberMe) window.localStorage.setItem(REMEMBER_KEY, email.trim());
      else window.localStorage.removeItem(REMEMBER_KEY);
    } catch {
      /* ignore */
    }

    login(email, password, isRegister ? name : undefined);
    router.push('/dashboard');
  };

  const handleDemoLogin = () => {
    login('alex.student@skillforge.io', 'demo', 'Alex');
    router.push('/dashboard');
  };

  const switchMode = () => {
    setMode(isRegister ? 'login' : 'register');
    setError('');
    setNotice('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-3xl rounded-full pointer-events-none" />

        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-wider">SKILLFORGE</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">{isRegister ? 'Create Your Account' : 'Welcome Back'}</h1>
          <p className="text-xs text-slate-400">
            {isRegister
              ? 'Sign up to save your progress and quiz scores.'
              : 'Log in to access your courses and student dashboard.'}
          </p>
        </div>

        {/* Validation Error Display */}
        {error && (
          <div role="alert" className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}
        {notice && (
          <div role="status" className="p-3 rounded-xl bg-sky-950/60 border border-sky-800/60 text-sky-200 text-xs text-center font-medium flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-px" /> <span>{notice}</span>
          </div>
        )}

        {/* Form (noValidate so our own messages always show) */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {isRegister && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 transition"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="student@skillforge.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Password
              </label>
              {!isRegister && (
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setNotice('Password reset needs an email server, which this demo does not have. Sign in with any valid email and password, or use the demo account.');
                  }}
                  className="text-xs text-violet-400 hover:text-violet-300 transition"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setRememberMe(!rememberMe)}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-300"
              aria-pressed={rememberMe}
            >
              {rememberMe ? <CheckSquare className="w-4 h-4 text-violet-400" /> : <Square className="w-4 h-4 text-slate-600" />}
              <span>Remember my email on this device</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 shadow-xl shadow-violet-600/25 transition-all"
          >
            {isRegister ? 'Create Account' : 'Log In'} <ArrowRight className="w-4 h-4" />
          </button>

          {!isRegister && (
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              Continue as demo student
            </button>
          )}
        </form>

        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          Demo mode: there is no server, so accounts are stored only in this browser.
        </p>

        {/* Switch mode */}
        <div className="text-center pt-2 border-t border-slate-800/80 text-xs text-slate-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={switchMode} className="font-bold text-violet-400 hover:text-violet-300 transition">
            {isRegister ? 'Log In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
