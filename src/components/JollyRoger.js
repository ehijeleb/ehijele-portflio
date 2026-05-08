import React from 'react';

/**
 * Luffy's Straw Hat Jolly Roger using the actual image.
 *
 * The source image is black-on-white. On dark backgrounds:
 *   - `invert(1)` flips it to white-on-black
 *   - `mix-blend-mode: screen` makes the black areas transparent
 * For the amber footer tint a sepia+saturate chain is applied instead.
 */
function JollyRoger({ variant = 'watermark', className, style }) {
  const filters = {
    // Hero background watermark — white skull, black dissolved away
    watermark: {
      filter: 'invert(1)',
      mixBlendMode: 'screen',
    },
    // Footer icon — amber-tinted to match the palette
    footer: {
      filter:
        'invert(1) sepia(1) saturate(4) hue-rotate(4deg) brightness(0.75)',
    },
  };

  return (
    <img
      src="/jolly-roger.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={{ ...filters[variant], userSelect: 'none', ...style }}
    />
  );
}

export default JollyRoger;
