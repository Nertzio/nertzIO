import React from 'react'

import { Link } from 'react-router-dom';


const Home = () => {

  return (
    <div style={{
      backgroundColor: '#f90',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
    }}>
      <div style={{
        borderColor: 'black',
        borderStyle: 'solid',
        paddingBottom: '100px',
        backgroundColor: '#f90',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center'
      }}>

        <h1 style={{
          textAlign: 'center',
          fontSize: '70px',
          color: 'white',
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
          marginBottom: '70px'
        }} >Nertz.io</h1>
        <Link
          style={{
            textAlign: 'center',
            padding: '15px',
            margin: '30px',
            borderColor: 'black',
            backgroundColor: 'white',
            color: 'black',
            boxShadow: '10px 5px 5px black',
          }}
          to={'/join'}
        >Join A Game!</Link>
      </div>
      <div style={{
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        width: '100%',
        paddingTop: '30px',
        paddingBottom: '30px'
      }}>
        <h3>How To Play Nertz</h3>
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/zvca2HKMW0c?rel=0&amp;showinfo=0" frameBorder="0" allowFullScreen />
      </div>

    </div>
  )
}


export default Home;
