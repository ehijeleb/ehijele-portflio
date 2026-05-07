import { useEffect } from 'react';

function MouseGlow() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--mx', '-1000px');
    root.style.setProperty('--my', '-1000px');

    const onMove = (e) => {
      root.style.setProperty('--mx', `${e.clientX}px`);
      root.style.setProperty('--my', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return null;
}

export default MouseGlow;
