import React from 'react';

const BarTop = (props) => {

  const determineAlignment = () => {
    const {alignLeft, alignRight, alignCenter} = props;
    const choices = [alignLeft, alignRight, alignCenter]
    return ['flex-start', 'flex-end', 'center'][choices.indexOf(true)];
  }

  const renderChildren = () => {
    const arrayOfChildren = React.Children.toArray(props.children);
    return arrayOfChildren.map((child, idx, arr) => {
      const isLast = idx === arr.length - 1
      return (
        <div
          key={idx}
          style={{
            borderRight: `${isLast ? 'none' : '1px solid rgba(0, 0, 0, 0.2)'}`,
            paddingLeft: '10px',
            paddingRight: '10px'
        }}>
          {child}
        </div>)
    })
  }

  return (

      <div style={{
        alignItems: 'center',
        backgroundColor: 'white',
        display: 'flex',
        flex: '1 1 100%',
        height: '50px',
        justifyContent: determineAlignment(),
        width: '100%',
      }}>

        {renderChildren()}

      </div>


  )

}

export default BarTop;
