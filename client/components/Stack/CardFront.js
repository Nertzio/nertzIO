// design legible playing card
/* coming in on props:
            'suit': 'heart',
            'number': 2,
            'name': 'ace',
*/

import React from 'react';

const CardFront = (props) => {
      const {
            suit,
            name,
            number,
      } = props;
      return (
            <div style={styles.cardFront}>
                <span>{name} </span>
                <span>{suit}</span>
            </div>
      )
}

const styles = {
  cardFront: {
    backgroundColor: 'lightblue',
    color: 'white',
    height: '100%'
  }
}

export default CardFront;
