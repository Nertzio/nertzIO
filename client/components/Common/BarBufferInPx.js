import React from 'react';

const BarBufferInPx = ({height}) => {
  console.log('BarBufferInPx')
  return (
    <div style={{height: `${height}px` || 0}} />
  )
}

export default BarBufferInPx;
