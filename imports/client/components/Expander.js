import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { toggleGlossar } from '../../helper/actions';

class Expander extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = '▲';
    if (this.props.directionDown) {
      if (!this.props.expanded) {
        text = '▼';
      }
    } else {
      if (this.props.expanded) {
        text = '▼';
      }
    }
    return (
      <Indicator className="Expander"
        href="#"
        onClick={e => {
          this.props.callback(e);
        }}
      >
        {text}
      </Indicator>
    );
  }
}

Expander.propTypes = {
  expanded: PropTypes.bool,
  directionDown: PropTypes.bool,
  callback: PropTypes.func
};

export default Expander;

const Indicator = styled.div`
  display: inline-block;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;