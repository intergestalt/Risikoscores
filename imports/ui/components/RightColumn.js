import React, { Component } from 'react';
import { Navigation, GlossarArea } from './';
import PropTypes from 'prop-types';

class RightColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="RightColumn">
        <GlossarArea
          room={this.props.room}
          roomGlossar={this.props.roomGlossar}
          glossarDetailId={this.props.glossarDetailId}
          glossarExpanded={this.props.glossarExpanded}
          toggleExpandGlossar={this.props.toggleExpandGlossar}
          glossarCallback={this.props.glossarCallback}
          closeGlossarDetail={this.props.closeGlossarDetail}
        />
        <Navigation
          room={this.props.room}
          navigationExpanded={!this.props.glossarExpanded}
          toggleExpandGlossar={this.props.toggleExpandGlossar}
        />
      </div>
    );
  }
}

RightColumn.propTypes = {
  room: PropTypes.object,
  glossarExpanded: PropTypes.bool,
  glossarDetailId: PropTypes.string,
  roomGlossar: PropTypes.object,
  toggleExpandGlossar: PropTypes.func,
  glossarCallback: PropTypes.func,
  closeGlossarDetail: PropTypes.func
};

export default RightColumn;
