import React from 'react'
import {Stack} from '../../components';
import PropTypes from 'prop-types';

const StackDrawn =  ({cards}) => {

  return (
    <div style={{
      border: '1px solid gray',
      height: '100%',
      flex: '1 10%'
    }}>
      <Stack cards={cards}/>
    </div>
  )
}


export default StackDrawn;
