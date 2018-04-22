import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { colors, dist } from '../../config/styles';

import { getPopupActive } from '../../helper/actions';

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.popupActive) {
      return (
        <PopupDiv>
          <a href="#">Hallo Welt</a>
        </PopupDiv>
      );
    }
    return null;
  }
}

Popup.propTypes = {};

export default withTracker(props => {
  return {
    popupActive: getPopupActive();
  };
})(Popup);

const PopupDiv = styled.div`
  position: fixed;
  background-color: ${colors.turqoise};
  bottom: 2.5rem;
  line-height: 200px;
  width: 75%;
  height: 3rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  text-align: center;
  z-index: 20;
`;

/*

 <CSSTransitionGroup
        transitionName="bootomUp"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            zIndex: 20,
            background: '#FF0000'
          }}
        >
          Hallo Welt
        </div>
      </CSSTransitionGroup>

      */
