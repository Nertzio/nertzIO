import React from 'react';
import Grid from './Grid';

function GameField(props) {
  const {fieldStackCount} = props;
  return (
    <section style={{
      backgroundColor: 'purple',
      border: '1px solid gray', // TODO: remove later
      color: 'white',
      display: 'flex',
      flexGrow: 9,
      width: '100%',
    }}>
      <Grid cellCount={fieldStackCount} />
    </section>
  )
}

export default GameField;
