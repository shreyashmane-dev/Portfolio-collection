import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, select, [role="button"], .interactive');
        setIsPointer(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;
    const updateTrailing = () => {
      setTrailingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18
      }));
      animationFrameId = requestAnimationFrame(updateTrailing);
    };
    animationFrameId = requestAnimationFrame(updateTrailing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pos, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Central Aim Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--accent-red)] transition-transform duration-75 ease-out shadow-[0_0_8px_var(--accent-red)]"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${isClicked ? 0.6 : isPointer ? 1.4 : 1})`,
        }}
      />

      {/* Cyber Reticle Ring */}
      <div
        className="fixed top-0 left-0 border border-[var(--accent-red)] rounded-full transition-all duration-300 ease-out flex items-center justify-center opacity-80"
        style={{
          width: isPointer ? '48px' : '30px',
          height: isPointer ? '48px' : '30px',
          transform: `translate3d(${trailingPos.x - (isPointer ? 24 : 15)}px, ${trailingPos.y - (isPointer ? 24 : 15)}px, 0) scale(${isClicked ? 0.8 : 1}) rotate(${isPointer ? '45deg' : '0deg'})`,
          borderColor: isPointer ? 'var(--accent-blue)' : 'var(--accent-red)',
          boxShadow: isPointer ? '0 0 14px var(--accent-blue)' : 'none'
        }}
      >
        {/* Reticle ticks */}
        <div className="absolute top-0 w-1 h-0.5 bg-[var(--accent-red)]" />
        <div className="absolute bottom-0 w-1 h-0.5 bg-[var(--accent-red)]" />
        <div className="absolute left-0 w-0.5 h-1 bg-[var(--accent-red)]" />
        <div className="absolute right-0 w-0.5 h-1 bg-[var(--accent-red)]" />
      </div>
    </div>
  );
};
