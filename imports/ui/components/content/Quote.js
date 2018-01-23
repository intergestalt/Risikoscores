import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { getSelectedTabId, getSelectedRoomId } from '../../../helper/actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { dist } from '../../../config/styles';
import { Asset, Annotation } from './';

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAudio() {
    const file = this.props.file
    if (!file) return false;
    
    return (
      <audio src={file} controls="controls"></audio>
    )
  }

  renderSource() {
    const source = this.props.source
    if (!source) return false;
    
    return (
      <Source>{source}</Source>
    )
  }

  render() {
    return (
      <Container className="Quote">
      {this.renderAudio()}
      {this.props.text}
      {this.renderSource()}
      </Container>
    );
  }
}

Quote.propTypes = {
  text: PropTypes.string,
  audio: PropTypes.string,
};

export default withTracker(props => {
  let file = false
  if (props.audio) {
    const roomId = getSelectedRoomId();
    const tabId = getSelectedTabId();
    file = "/uploads/" + roomId + "/" + tabId + "/" + props.audio
  }
  return {
    file
  };
})(Quote);

const Container = styled.blockquote`
  background-color: rgba(255,255,255,0.5);
  opacity: 0.85;
  border-radius: 1em;
  padding: ${dist.tiny};
  margin-left: ${dist.tiny};
  margin-right: ${dist.tiny};   
  margin-bottom: 1em;  
  & audio {
    margin-bottom: ${dist.tiny};
    display: block; 
  }
`;

const Source = styled.small`
  display: block;
  margin-top: ${dist.tiny};
  font-size: 80%;
  text-align: left;
`