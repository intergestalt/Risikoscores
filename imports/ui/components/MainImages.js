import React, { Component, Image } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class MainImages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageContainer className="MainImages">
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
      </ImageContainer>
    );
  }
}

MainImages.propTypes = {
  roomFolder: PropTypes.string,
  images: PropTypes.array
};

export default MainImages;

const ImageContainer = styled.div`
  img {
    width:100%;
    height:33.33vh;
    object-fit: cover;
  }
`;