import React from 'react';
import {Stack} from '../Stack';

function GameFieldStack(props) {
  const {cellId} = props;
  return (
    <div style={{
      backgroundColor: 'black',
      border: '1px solid gray', // TODO: remove later
      color: 'white',
      display: 'flex',
      flexGrow: 1,
      height: '100%',
      width: '100%',
    }}>
      {/* <Stack stackKey={cellId}  /> */}
    </div>
  )
}

export default GameFieldStack;
