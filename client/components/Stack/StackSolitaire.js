import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';
import PropTypes from 'prop-types';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../../DragNDrop/constants';
import {pushCardToStackByPlayer} from '../../firebase/firebase_utils';

const StackSolitaire = ({cards, firebaseRef}) => {
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
      <Stack cards={faceUpCards} firebaseStackRef={firebaseRef} />
    </div>
  )
}

const solitaireTarget = {
  drop(props, monitor) {
    // TODO: get the data from dropped card (monitor.getItem())
    // and tell firebase to push this card onto the designated stack
    const playerKey = props.playerKey // add a playerKey to props?
    const stackKey = props.stackKey // add a stackKey to props?
    const cardData = monitor.getItem()
    pushCardToStackByPlayer(cardData, stackKey)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

const mapState = (state, {stackKey}) => ({
  cards: state[stackKey],
  firebaseRef: state.firebaseRefs.stacks[stackKey],
})

const connectedSolitaireStack = connect(mapState, null)(StackSolitaire);

export default DropTarget(ItemTypes.CARD, solitaireTarget, collect)(connectedSolitaireStack);
