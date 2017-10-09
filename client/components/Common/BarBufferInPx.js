import React from 'react';

const BarBufferInPx = ({height}) => {
  return (
    <div style={{height: `${height}px` || 0}} />
  )
}

export default BarBufferInPx;
