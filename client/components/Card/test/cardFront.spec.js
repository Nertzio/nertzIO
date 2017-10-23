import React from 'react'
import {shallow} from 'enzyme';
import {expect} from 'chai';
import CardFront from '../CardFront';

describe('<CardFront />', () => {
  const props = {
    displayName: '4',
    textColor: 'red',
    symbol: 'heart'
  }
  const shallowCardFront = shallow(<CardFront {...props} />);
  it('has two paragraph elements', () => {
    expect(shallowCardFront.find('p')).to.have.length(2)
  })

})
