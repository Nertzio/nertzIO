import React from 'react';


const styler = () => ({

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
      height: '50vh',
      maxHeight: '500px',
      maxWidth: '500px',
      width: '50vw',
      zIndex: 1000,
    }
  })

const Modal = ({children, size}) => {
  const styles = styler();
  return (
    <div style={styles.modalWrapper}>
      <div style={styles.modalDialog}>

        {children}

      </div>
    </div>
  )
}


export default Modal;
