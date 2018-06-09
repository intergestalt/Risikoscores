import React from 'react';
import styled from 'styled-components';

const CenteredFlex = (props) =>
  <FlexContainer {...props}>
    <span>
      {props.children}
    </span>
  </FlexContainer>

const CenteredTransform = (props) =>
  <Transform {...props}>
    {props.children}
  </Transform>

const Centered = props => {
  if (props.type = "verticalTransform") {
    return CenteredTransform
  } else {
    return CenteredFlex
  }
}

export default Centered

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`
const Transform = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`
