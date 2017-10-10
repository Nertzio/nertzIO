import React from 'react';


const styler = ({shouldShow}) => ({

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
      alignContent: 'stretch',
      alignItems: 'center',
      backgroundColor: 'white',
      // display: 'flex',
      filter: `drop-shadow(15px 15px 25px rgba(0, 0, 0, 0.9))`,
      // flexDirection: 'column',
      height: '50vh',
      justifyContent: 'space-around',
      maxHeight: '500px',
      maxWidth: '500px',
      opacity: shouldShow ? 1 : 0,
      padding: 20,
      transform: shouldShow ? 'scale(1, 1)' : 'scale(0.01, 0.01)',
      transition: `all 1000ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
      width: '50vw',
      zIndex: shouldShow ? 1000 : -1,
    }
  })

const Modal = (props) => {
  const {children, shouldShow, size} = props;
  const styles = styler(props);
  if (!shouldShow) return null;

  return (
    <div style={styles.modalWrapper}>
      <div style={styles.modalDialog}>

        {children}

      </div>
    </div>
  )
}


export default Modal;
