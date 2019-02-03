import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactAudioPlayer from 'react-audio-player';

import { dist } from '../../config/styles';

const play = (
  <svg
    aria-hidden="true"
    data-prefix="far"
    data-icon="play-circle"
    className="svg-inline--fa fa-play-circle fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"
    />
  </svg>
);
const stop = (
  <svg
    aria-hidden="true"
    data-prefix="far"
    data-icon="stop-circle"
    className="svg-inline--fa fa-stop-circle fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm296-80v160c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16z"
    />
  </svg>
);
const pause = (
  <svg
    aria-hidden="true"
    data-prefix="far"
    data-icon="pause-circle"
    className="svg-inline--fa fa-pause-circle fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"
    />
  </svg>
);

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      time: 0,
      progress: 0
    };
    this.PlayButton = this.PlayButton.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
  }

  handleUpdate(time) {
    this.setState({
      time,
      progress: time / this.rap.audioEl.duration
    });
  }

  handlePlay() {
    if (this.state.playing) {
      this.rap.audioEl.pause();
    } else {
      this.rap.audioEl.play();
    }
    this.setState({ playing: !this.state.playing });
  }

  handleSeek(event) {
    const rect = event.target.getBoundingClientRect();
    const progress = (event.clientX - rect.left) / rect.width;
    const time = progress * this.rap.audioEl.duration;
    this.rap.audioEl.currentTime = time;
    this.handleUpdate(time);
  }

  handleEnded() {
    this.setState({ playing: false });
  }

  PlayButton() {
    const word = this.state.playing ? pause : play;
    return <Button onClick={this.handlePlay}>{word}</Button>;
  }

  render() {
    const seconds = Math.round(this.state.time);
    const time = new Date(seconds * 1000).toISOString().substr(14, 5);
    return (
      <Container className="AudioPlayer">
        <ReactAudioPlayer
          ref={element => {
            this.rap = element;
          }}
          src={this.props.src}
          listenInterval={16.6}
          onListen={this.handleUpdate}
          onEnded={this.handleEnded}
        />
        {this.PlayButton()}
        <div>{time}</div>
        <Indicator onClick={this.handleSeek} ratio={this.state.progress} />
      </Container>
    );
  }
}

AudioPlayer.propTypes = {
  scr: PropTypes.string
};

export default AudioPlayer;

const Container = styled.div`
  opacity: 0.85;
  height: 1.25em;
  display: flex;
  justify-content: space-between;
  > * {
    margin: auto;
  }
  > *:nth-child(n + 3) {
    margin-left: 1.2ex;
  }
`;

const Button = styled.div`
  cursor: pointer;
  &,
  svg {
    width: auto;
    height: 100%;
  }
  path {
    fill: rgba(0, 0, 0, 0.95);
  }
`;

const Indicator = styled.div`
  width: 100%;
  height: 0.6ex;
  background-color: white;
  display: flex;
  &::before {
    content: '';
    flex: ${props => props.ratio};
    background-color: black;
  }
`;
