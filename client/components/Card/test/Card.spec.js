import React from 'react'
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Card from '../Card';
import CardFront from '../CardFront';
import CardBack from '../CardBack';

describe('<Card /> component', () => {

  const props = {
    isFaceUp: true,
    playerInitials: 'db',
    borderColor: 'lightgray',
  }

  it('renders only a <CardFront /> component when props.isFaceUp is true', () => {
    props.isFaceUp = true
    const shallowCard = shallow(<Card {...props} />)
    expect(shallowCard.find(CardFront)).to.have.length(1)
    expect(shallowCard.find(CardBack)).to.have.length(0)
  })

  it('renders a <CardBack /> component when props.isFaceUp is false', () => {
    props.isFaceUp = false
    const shallowCard = shallow(<Card {...props} />)
    expect(shallowCard.find(CardFront)).to.have.length(0)
    expect(shallowCard.find(CardBack)).to.have.length(1)
  })
})
