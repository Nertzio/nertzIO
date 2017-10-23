import React from 'react';
import {connect} from 'react-redux';
import DragCard from './DragCard';
import {
  takeInitials,
} from '../../vanillaUtils';

const mapState = (state, {belongsTo}) => ({
  user: state.user,
  playerInitials: takeInitials(state.players[belongsTo].displayName),
  userPlayerNum: state.game.userPlayerNum,
})

export default connect(mapState)(DragCard);

