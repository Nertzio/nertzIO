// import CardFront and CardBack
/* if card.isFaceUp
      then render CardFront
   else
      render CardBack
 */

import React from 'react';
import {CardFront, CardBack} from '../Stack';

const Card = (props) => {
      const {
            suit,
            name,
            number,
            isFaceUp,
            belongsTo,
            x, y, z
      } = props;
      return (
            <div style={styles.card}>
                  {isFaceUp
                        ? <CardFront {...props} />
                        : <CardBack {...props} />
                  }
            </div>
      )
}

const styles = {
      card: {
            border: '1px gray solid',
            width: '75px',
            height: '105px',
            margin: '0 auto',
      }
}

export default Card;
