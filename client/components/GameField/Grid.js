import React from 'react';
import Cell from './Cell';

function Grid(props) {
  const {cellCount} = props;

  const renderCells = (numCells) => {
    const cells = [];
    for (let i = 1; i <= numCells; i++) {
      const responsiveCell = ( // make this its own wrapper component?
        <div key={i} className="grid-cell-wrapper" >
          <Cell cellId={i} />
        </div>
      )
      cells.push(responsiveCell);
    }
    return cells;
  }
  return (
    <div className="grid-component">
      {renderCells(cellCount)}
    </div>
  )
}

export default Grid;
