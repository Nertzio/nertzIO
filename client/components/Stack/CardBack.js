// card pattern and player identifier
// design legible playing card


import React from 'react';

const CardBack = (props) => {
      const {
           belongsTo,
      } = props;
      return (
            <div style={styles.cardBack}>
                <p>Player {belongsTo}</p>
            </div>
      )
}

const styles = {
  cardBack: {
    backgroundColor: 'red',
    color: 'white',
  }
}

export default CardBack;
