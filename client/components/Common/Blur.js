import React from 'react';

const Blur = ({ children, isActive, strength }) => {

  const filter = isActive
    ? `blur(${strength}px) grayscale(10%)`
    : 'none';

  const transform = isActive
    ? `scale(0.8)`
    : 'none';

  return (
    <div style={{
      filter: filter,
      transform: transform,
      transition: `all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
      width: '100%',
      maxWidth: '100%',
      // zIndex: 100,
    }}>
    {children()}
    </div>
  )
}

export default Blur;
