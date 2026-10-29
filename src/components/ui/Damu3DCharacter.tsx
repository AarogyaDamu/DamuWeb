import React, { useEffect, useRef, useState, useCallback } from 'react';
import type { DamuMode, DamuSceneHandle } from '../../lib/damuSceneV2';

export interface Damu3DCharacterProps {
  mode?: DamuMode;
  reducedMotion?: boolean;
  paused?: boolean;
  className?: string;
  onSceneReady?: () => void;
}

function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function Damu3DCharacter({
  mode = 'idle',
  reducedMotion = false,
  paused = false,
  className = '',
  onSceneReady,
}: Damu3DCharacterProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<DamuSceneHandle | null>(null);
  const [hasWebGL] = useState<boolean>(() => isWebGLSupported());
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Store latest initial props in refs so effect only runs on mount
  const initPropsRef = useRef({ mode, paused, reducedMotion, onSceneReady });
  useEffect(() => {
    initPropsRef.current = { mode, paused, reducedMotion, onSceneReady };
  });

  // Lazy-load Three.js scene dynamically on mount
  useEffect(() => {
    if (!hasWebGL || hasError) return;

    let disposed = false;
    const host = hostRef.current;
    if (!host) return;

    // Clear any previous child nodes to guarantee no duplicate canvases
    while (host.firstChild) {
      host.removeChild(host.firstChild);
    }

    import('../../lib/damuSceneV2')
      .then(({ createDamuScene }) => {
        if (disposed || !hostRef.current) return;

        try {
          const { mode: m, paused: p, reducedMotion: rm, onSceneReady: osr } = initPropsRef.current;
          const handle = createDamuScene(hostRef.current, {
            mode: m,
            paused: p,
            reducedMotion: rm,
            onError: (err) => {
              console.warn('[Damu3D] WebGL scene failed, falling back to static asset:', err);
              setHasError(true);
            },
          });

          handleRef.current = handle;
          setIsLoaded(true);
          osr?.();
        } catch (err) {
          console.warn('[Damu3D] Failed to create Damu scene:', err);
          setHasError(true);
        }
      })
      .catch((err) => {
        console.warn('[Damu3D] Failed to load 3D module:', err);
        setHasError(true);
      });

    return () => {
      disposed = true;
      if (handleRef.current) {
        handleRef.current.dispose();
        handleRef.current = null;
      }
      setIsLoaded(false);
    };
  }, [hasWebGL, hasError]);

  // Keep mode in sync
  useEffect(() => {
    if (handleRef.current) {
      handleRef.current.setMode(mode);
    }
  }, [mode]);

  // Keep paused state in sync
  useEffect(() => {
    if (handleRef.current) {
      handleRef.current.setPaused(paused);
    }
  }, [paused]);

  // Keep reducedMotion in sync
  useEffect(() => {
    if (handleRef.current) {
      handleRef.current.setReducedMotion(reducedMotion);
    }
  }, [reducedMotion]);

  // Wave interaction on click / tap
  const handleWave = useCallback(() => {
    if (handleRef.current) {
      handleRef.current.wave();
    }
  }, []);

  const showFallback = !hasWebGL || hasError;

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* 3D Scene Host Container */}
      <div
        ref={hostRef}
        onClick={handleWave}
        className="relative w-full max-w-[340px] sm:max-w-[400px] h-[340px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        title="Damu 3D Mascot - Drag to rotate, click to wave"
        role="img"
        aria-label="Interactive 3D Damu Mascot"
      />

      {/* Static Fallback (if WebGL unavailable or during loading) */}
      {showFallback && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
          <img
            src="/damu-mascot.webp"
            alt="AarogyaDamu Mascot"
            className="w-full max-w-[320px] sm:max-w-[360px] h-auto object-contain drop-shadow-2xl"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      {/* Subtle interactive affordance hint */}
      {!showFallback && isLoaded && (
        <div className="mt-1 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#29231F]/05 border border-[#29231F]/08 text-2xs font-mono text-[#65564C] tracking-wider shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/80 animate-pulse" />
          <span>Drag to inspect · Tap to wave</span>
        </div>
      )}
    </div>
  );
}
