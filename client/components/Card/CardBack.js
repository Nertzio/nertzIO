import React from 'react';

const CardBack = ({initials, color}) => {

  return (
    <div
      className="card-back"
      style={{
        backgroundColor: color,
    }}>
        <p>{initials}</p>
    </div>
  )
}

export default CardBack;
