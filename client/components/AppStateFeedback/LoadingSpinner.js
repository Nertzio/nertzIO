import React from 'react';
import Loading from 'react-loading-animation';

const LoadingSpinner = (props) => {
    return (
      <div style={{
        alignItems: 'center',
        color: 'white',
        display: 'flex',
        height: '100vh',
        justifyContent: 'space-around',
        // position: 'relative',
        zIndex: 100,
      }}>

        <div style={{
          // position: 'absolute',
          // top: '30%',
        }} >
          <Loading />
        </div>

      </div>
    )
}

export default LoadingSpinner;
