import React from 'react';

const Blur = ({ children, isActive, strength }) => {

  const filter = isActive
    ? `blur(${strength}px) grayscale(10%)`
    : 'none';

  const transform = isActive
    ? `scale(0.8)`
    : 'none';

  return (
    <div
      className="blur"
      style={{
        filter: filter,
        transform: transform,
    }}>

      {children()}

    </div>
  )
}

export default Blur;
