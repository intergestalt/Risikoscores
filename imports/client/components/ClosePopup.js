import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { colors, dist } from '../../config/styles';
import { closePopup } from '../../helper/popup';
import { Image } from '.';

class ClosePopup extends React.Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
  }
  closePopup() {
    closePopup();
  }
  render() {
    const closeAsset = {
      type: 'image',
      name: 'close.png',
      folder: 'popups'
    };
    return (
      <CloseDiv
        onClick={e => {
          this.closePopup(e);
        }}
      >
        <Image asset={closeAsset} />
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
  right: 0px;
  top: 0px;
  cursor: pointer;
  width: ${dist.small};
  height: ${dist.small};
`;
