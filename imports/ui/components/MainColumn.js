import React, { Component } from 'react';
import { MainImages, MainContent } from './';
import PropTypes from 'prop-types';

class MainColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MainColumn">
        <MainImages
          roomFolder={this.props.room._id}
          images={this.props.room.images}
        />
        <MainContent room={this.props.room} />
      </div>
    );
  }
}
MainColumn.propTypes = {
  room: PropTypes.object
};

export default MainColumn;
