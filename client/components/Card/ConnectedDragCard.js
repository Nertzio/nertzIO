import React from 'react';
import {connect} from 'react-redux';
import DragCard from './DragCard';
import {
  takeInitials,
} from '../../vanillaUtils';

const mapState = (state, {belongsTo}) => ({
  // for CardBack's props.initials
  playerInitials: takeInitials(state.players[belongsTo].displayName),
  // used in canDrag for DragCard
  userPlayerNum: state.game.userPlayerNum,
})

export default connect(mapState)(DragCard);

