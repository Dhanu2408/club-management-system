'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw, AlertTriangle,
} from 'lucide-react';

interface VideoPlayerProps {
  videoUrl?: string;
  title: string;
  /** Start playing as soon as the video is ready (used by "auto-play next"). */
  autoPlay?: boolean;
  /** Called once when the video plays to the end. */
  onEnded?: () => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const FALLBACK_VIDEO =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, autoPlay = false, onEnded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [hasError, setHasError] = useState<boolean>(false);

  /**
   * FIXED (was BUG 3): this handler used to call setIsPlaying(false) every time,
   * so the Play button could never start the video. It now toggles the state.
   */
  const handlePlayPause = useCallback(() => {
    if (hasError) {
      // Retry after a failed load: reload the source, then play.
      setHasError(false);
      videoRef.current?.load();
      setIsPlaying(true);
      return;
    }
    setIsPlaying((playing) => !playing);
  }, [hasError]);

  // Drive the <video> element from the isPlaying state.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = speed;
  }, [speed]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const cur = video.currentTime;
    const dur = video.duration || 0;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress(dur ? (cur / dur) * 100 : 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercentage = parseFloat(e.target.value);
    const video = videoRef.current;
    if (video && duration) {
      video.currentTime = (newPercentage / 100) * duration;
      setProgress(newPercentage);
    }
  };

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      el.requestFullscreen?.().catch(() => undefined);
    }
  }, []);

  const skipTime = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    const max = video.duration || Number.MAX_SAFE_INTEGER;
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), max);
  }, []);

  const cycleSpeed = () => {
    setSpeed((s) => SPEEDS[(SPEEDS.indexOf(s) + 1) % SPEEDS.length]);
  };

  // Keyboard shortcuts: Space/K play-pause, J/L or arrows ±10s, M mute, F fullscreen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) return;
      switch (e.key.toLowerCase()) {
        case ' ':
          if (tag === 'BUTTON' || tag === 'A') return; // let focused buttons keep their own behaviour
          e.preventDefault();
          handlePlayPause();
          break;
        case 'k': handlePlayPause(); break;
        case 'arrowleft':
        case 'j': skipTime(-10); break;
        case 'arrowright':
        case 'l': skipTime(10); break;
        case 'm': toggleMute(); break;
        case 'f': toggleFullscreen(); break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePlayPause, skipTime, toggleMute, toggleFullscreen]);

  const formatTime = (secs: number) => {
    if (!Number.isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative group bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
    >
      {/* Video Canvas / Element */}
      <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl || FALLBACK_VIDEO}
          className="w-full h-full object-contain cursor-pointer"
          playsInline
          preload="metadata"
          onClick={handlePlayPause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            onEnded?.();
          }}
          onError={() => {
            setHasError(true);
            setIsPlaying(false);
          }}
          onCanPlay={() => setHasError(false)}
        />

        {/* Overlay Title */}
        <div className="absolute top-4 left-4 right-4 bg-gradient-to-b from-slate-950/80 to-transparent p-3 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="text-sm font-semibold text-white truncate block">{title}</span>
        </div>

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center gap-2 text-center px-6">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
            <p className="text-sm font-semibold text-white">This video could not be loaded</p>
            <p className="text-xs text-slate-400">Check your internet connection, then press play to try again.</p>
          </div>
        )}

        {/* Play Pause Center Overlay */}
        {!hasError && (
          <button
            onClick={handlePlayPause}
            className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-violet-600/80 hover:bg-violet-600 text-white flex items-center justify-center shadow-xl shadow-violet-600/30 backdrop-blur transform hover:scale-110 transition-all ${
              isPlaying ? 'opacity-0 group-hover:opacity-90' : 'opacity-90 hover:opacity-100'
            }`}
            aria-label={isPlaying ? 'Pause Lesson Video' : 'Play Lesson Video'}
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
          </button>
        )}
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
        {/* Progress Bar Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 min-w-[36px]">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            aria-label="Seek"
            className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <span className="text-xs font-mono text-slate-400 min-w-[36px]">{formatTime(duration)}</span>
        </div>

        {/* Playback Actions & Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handlePlayPause}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              title="Play / Pause (Space)"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => skipTime(-10)}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition"
              title="Rewind 10s (J)"
              aria-label="Rewind 10 seconds"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => skipTime(10)}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition"
              title="Forward 10s (L)"
              aria-label="Forward 10 seconds"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <button
                onClick={toggleMute}
                className="p-1.5 text-slate-400 hover:text-white transition"
                title="Mute (M)"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume"
                className="w-16 h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-violet-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={cycleSpeed}
              className="px-2.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition min-w-[52px]"
              title="Playback speed"
              aria-label={`Playback speed ${speed}x`}
            >
              {speed}x
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Fullscreen (F)"
              aria-label="Toggle fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
