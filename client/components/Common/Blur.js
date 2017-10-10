import React from 'react';

const Blur = ({ children, isActive, strength }) => {

  const filter = isActive
    ? `blur(${strength}px) grayscale(10%)`
    : 'none';

  return (
    <div style={{
      filter: isActive ? `blur(${strength}px)` : 'none',
      width: '100%',
      // zIndex: 100,
    }}>
    {children()}
    </div>
  )
}

export default Blur;
