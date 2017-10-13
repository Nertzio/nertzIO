import React from 'react';
import {connect} from 'react-redux';
import {Modal} from '../Common';

const GameEndModal = ({players, isRoundOver, playerNumWhoCalledNertz}) => {

  const styler = () => ({
    header: {
      width: '90%',
      fontSize: '20px',
      color: 'rgb(72, 72, 72)'
    },
    playerScore: {
      fontSize: '20px'
    },
    playerId: {
      display: 'inline',
      color: 'rgb(72, 72, 72)'
    },
    score: {
      marginLeft: '12px',
      display: 'inline',
      color: 'rgb(72, 72, 72)'
    },
    bonusPoints: {
      width: '10%',
      color: 'rgb(72, 72, 72)',
      fontSize: '15px'
    }
  })

  const {
    header,
    bonusPoints,
    playerScore,
    playerId,
    playerStats,
    score
  } = styler()

  const playerNums = Object.keys(players)
  const playersValues = Object.values(players);

  const winner = playersValues.reduce((playerA, playerB) => {
    const aScore = playerA.score;
    const bScore = playerB.score;
    if (aScore > bScore) return playerA;
    return playerB;
  })

  const renderPlayerStats = () => {
    return playerNums.map(playerNum => {
      const player = players[playerNum];
      return (
      <div key={playerNum} style={playerScore}>
        <div style={playerId}>
          {player.displayName}
        </div>
        <div id={playerNum + 'score'} style={score}>
            {/* animate score count */}
            {player.score}
        </div>
        </div>
    )})
  }



  // INITIAL ATTEMPT AT ANIMATING SCORE COUNT
  // NEED TO FIGURE OUT HOW TO WAIT FOR DOM TO LOAD
  // const incrementThisTo = (div, num) => {
  //   let timeoutDiv = Promise.resolve(div)
  //   for (let i = 0; i < num; i++) {
  //     timeoutDiv = timeoutDiv.then(div => {
  //       div.textContent = i;
  //       return setTimeOut(() => timeoutDiv, 200)
  //     })
  //   }
  // }
  //   const animateScoreCount = () => {
  //     players.forEach(player => {
  //       const scoreDiv = document.getElementById(player.uid + 'score')
  //       incrementThisTo(scoreDiv, 100);
  //     })
  //   }

  console.log("Players", players)
  console.log("PlayerNumNertzETc", playerNumWhoCalledNertz)
  console.log("Round Over", isRoundOver)


  // -------------- COMPONENT --------------------

  return (
    <Modal shouldShow={isRoundOver}>
      <div style={header}>{playerNumWhoCalledNertz && players && players[playerNumWhoCalledNertz].displayName} calls Nertz!</div>
      <div style={bonusPoints}>+10pts</div>
      <br />
      <div style={header}>Let's see how everyone did...</div>
      <div>
      <h2 style={{fontSize: '37px', textAlign: 'center', color: 'rgb(72, 72, 72)'}}>{winner.displayName} is the winner!</h2>
        {renderPlayerStats()}
      </div>

      {/* {animateScoreCount()} */}

    </Modal>
  )
}

const mapState = state => ({
  isRoundOver: state.game.isNertzCalled,
  players: state.players,
  playerNumWhoCalledNertz: state.game.playerNumWhoCalledNertz,
})

export default connect(mapState)(GameEndModal);
