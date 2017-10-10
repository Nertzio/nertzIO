import React from 'react';

const Modal = ({children}) => {

  return (
    <div style={styles.modalWrapper}>
      <div style={styles.modalDialog}>

        {children}

      </div>
    </div>
  )
}

const styles = {

  modalWrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  modalDialog: {
    backgroundColor: 'white',
    boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)',
    height: '20vh',
    width: '20vw',
    zIndex: 1000,
  }
}

export default Modal;
