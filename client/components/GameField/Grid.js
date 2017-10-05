import React from 'react';
import Cell from './Cell';

function Grid(props) {
  const {cellCount} = props;

  const renderCells = (numCells) => {
    const cells = [];
    for (let i = 1; i <= numCells; i++) {
      const responsiveCell = ( // make this its own wrapper component?
        <div key={i} style={{flex: '1 1 auto', width: '25%'}} >
          <Cell cellId={i} />
        </div>
      )
      cells.push(responsiveCell);
    }
    return cells;
  }
  return (
    <div style={{
      alignItems: 'stretch',
      backgroundColor: 'orange',
      border: '1px solid gray', // TODO: remove later
      color: 'white',
      display: 'flex',
      flexGrow: 1,
      flexWrap: 'wrap',
      width: '100%',
    }}>
      {renderCells(cellCount)}
    </div>
  )
}

export default Grid;
