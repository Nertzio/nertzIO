import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';



const GamePending = (props) => {
  const gameKey = props.match.params.gameId; // Can pass in '-KvaJwYhaaD2p60bYUyD' for sample game

  //TODO: get players for that game from store to pass in rather than hard coded players:
  const players = [
    {username: 'CoolPlayer1'},
    {username: 'WooHooPlayer1'},
    {username: 'CoolPlayer2'},
    // {username: 'WooHooPlayer2'}
  ];

  return (
    <div className={styles.GamePending}>
      <h1>Waiting for Four Players...</h1>
      <h3>Game Key: {gameKey}</h3>
      <div style={{borderStyle: 'solid'}}>
        {
          players.length === 4 ? <Redirect to={`/gamesInProgress/${gameKey}`} /> :
          players.map((player, index) => (
            <h4 key={index} >{index + 1}. {player.username}</h4>
          ))
        }
      </div>
    </div>
  )
}

const styles = {
  GamePending: {
    backgroundColor: '#bbb',
  }
}

export default GamePending;
