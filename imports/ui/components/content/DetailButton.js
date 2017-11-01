import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DetailButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a
          href="#"
          onClick={e => {
            this.props.clickCallback(e, this.props.asset);
          }}
        >
          Detail
        </a>
      </div>
    );
  }
}
DetailButton.propTypes = {
  clickCallback: PropTypes.func,
  asset: PropTypes.object
};

export default DetailButton;
