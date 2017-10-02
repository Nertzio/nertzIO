import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CardField, PlayerArea, Stack} from '../components';
import {initGame} from '../firebase/firebase_utils';
import {
  p1BigStack,
  p1DrawnStack,
  p1LittleStack,
  p1Solitaire1Stack,
  p1Solitaire2Stack,
  p1Solitaire3Stack,
  p1Solitaire4Stack,
} from '../redux';

class  GameArea extends Component {

  componentDidMount() {
    initGame();
  }

  render() {
    const {p1Cards} = this.props;
      return (
        <div style={styles.gameArea}>
        <h1>Game Area</h1>
        <CardField />
        <PlayerArea {...p1Cards} />
      </div>
    )
  }
}

const styles = {
  gameArea: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-evenly',
    margin: '0 auto',
    width: '90%',
  }
}

const mapState = ({
  p1BigStack,
  p1DrawnStack,
  p1LittleStack,
  p1Solitaire1Stack,
  p1Solitaire2Stack,
  p1Solitaire3Stack,
  p1Solitaire4Stack,
}) => ({
  p1Cards: {
      BigStack: p1BigStack,
      DrawnStack: p1DrawnStack,
      LittleStack: p1LittleStack,
      Solitaire1Stack: p1Solitaire1Stack,
      Solitaire2Stack: p1Solitaire2Stack,
      Solitaire3Stack: p1Solitaire3Stack,
      Solitaire4Stack: p1Solitaire4Stack,
  },
})

const mapDispatch = null;

export default connect(mapState, mapDispatch)(GameArea);

