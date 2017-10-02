import React from 'react'
import {Stack} from '../../components';
import PropTypes from 'prop-types';

const StackSolitaire = ({cards}) => {
  const faceUpCards = cards.map(card => {
    card['isFaceUp'] = true
    return card
  })

  return (
    <div style={{
      border: '1px solid gray',
      height: '100%',
      flex: '1 10%'
    }}>
      <Stack cards={faceUpCards}/>
    </div>
  )
}


export default StackSolitaire;
