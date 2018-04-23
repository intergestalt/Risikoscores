import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { colors, dist } from '../../config/styles';
import {
  setPopupActive,
  setPopupClosing,
  incPopupsIndex
} from '../../helper/actions';

class ClosePopup extends React.Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
  }
  closePopup() {
    setPopupClosing(true);
    setTimeout(() => {
      incPopupsIndex();
      setPopupActive(false);
    }, 1000);
  }
  render() {
    return (
      <CloseDiv
        onClick={e => {
          this.closePopup(e);
        }}
      >
        X
      </CloseDiv>
    );
  }
}

ClosePopup.propTypes = {};

export default withTracker(props => {
  return {};
})(ClosePopup);

const CloseDiv = styled.div`
  position: absolute;
  background-color: ${colors.red};
  text-align: center;
  vertical-align: center;
  right: 10px;
  top: 10px;
  width: 40px;
  height: 40px;
`;
