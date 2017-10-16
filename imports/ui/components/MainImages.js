import React, { Component, Image } from 'react';
import PropTypes from 'prop-types';

class MainImages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MainImages">
        {this.props.images &&
          <img
            src={
              '../assets/' +
              this.props.roomFolder +
              '/' +
              this.props.images[0].name
            }
          />
        }
      </div>
    );
  }
}

MainImages.propTypes = {
  roomFolder: PropTypes.string,
  images: PropTypes.array
};

export default MainImages;
