import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Easing curves — Emil Kowalski's signature feels (expo-style settle)
export const EASE_OUT_QUART = [0.22, 1, 0.36, 1];
export const EASE_OUT_EXPO  = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT    = [0.32, 0.72, 0, 1];

// Spring presets — physical, low-energy
export const SPRING_SOFT   = { type: 'spring', stiffness: 180, damping: 24, mass: 0.6 };
export const SPRING_SNAPPY = { type: 'spring', stiffness: 320, damping: 26, mass: 0.5 };
export const SPRING_GENTLE = { type: 'spring', stiffness: 140, damping: 22, mass: 0.7 };

// Reveal-on-mount variant (used with stagger parents)
export const revealUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
};

// Arrow that nudges to the right on hover/focus of its parent.
// Pair with a wrapper that has `group` (Tailwind) and group-hover state.
export function AnimatedArrow({ char = '→', className = '', distance = 4 }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className} aria-hidden="true">{char}</span>;
  return (
    <motion.span
      aria-hidden="true"
      className={`inline-block ${className}`}
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      variants={{ rest: { x: 0 }, nudge: { x: distance } }}
      transition={SPRING_SNAPPY}
    >
      {char}
    </motion.span>
  );
}

// Wrapper that drives the arrow's "nudge" state from hover/focus.
// Renders a motion.span so children (e.g. AnimatedArrow) can read variants.
export function NudgeOnHover({ as: As = motion.span, children, className = '', ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <As
      className={className}
      initial="rest"
      animate="rest"
      whileHover="nudge"
      whileFocus="nudge"
      {...rest}
    >
      {children}
    </As>
  );
}
