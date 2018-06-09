import React from 'react';
import styled from 'styled-components';

const GameCharacterImage = props => {
  const { character, ...passedProps } = props
  const title = character.name + " " + character.family
  return <Img {...passedProps} title={title} src={`/assets/images/${character.name}.svg`} />
}

export default GameCharacterImage

const Img = styled.img`
  display: block;
`