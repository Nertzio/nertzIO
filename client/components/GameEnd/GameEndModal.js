import React from 'react';
import {connect} from 'react-redux';
import {Modal} from '../Common';

const GameEndModal = ({players, isRoundOver, playerNumWhoCalledNertz}) => {


  const styler = () => ({
    header: {
      // width: '90%',
    },

    bonusPoints: {
      // width: '10%',
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

  const renderPlayerStats = () => {
    const playerValues = Object.values(players)
    return playerValues.map((player, idx) => (
      <div key={player.uid} style={playerScore}>
       <div style={playerId}>
        {idx + 1}. {player.displayName}
       </div>
        <div id={player.uid + 'score'} style={score}>
          {/* animate score count */}
          {player.score}
        </div>

    </div>
    ))
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
        <div style={bonusPoints}>+ 10pts</div>


      <div style={header}>Let's see how everyone did:</div>
      <div style={playerStats}>
        {renderPlayerStats()}
      </div>

      {/* {animateScoreCount()} */}

    </Modal>
  )
}

const mapState = state => ({
  isRoundOver: state.game.isNertzCalled,
  players: state.players,
  playerNumWhoCalledNertz: state.game.playerNumWhoCalledNertz
})

export default connect(mapState)(GameEndModal);
