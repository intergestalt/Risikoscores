import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DetailButton extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
  }

  clickCallback(e) {
    e.preventDefault();
    console.log('Detail Click Button');
    console.log(this.props.asset);
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.props.clickCallback}>
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
