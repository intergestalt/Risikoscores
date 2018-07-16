import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { getSelectedTabId, getSelectedRoomId } from '../../../helper/actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AudioPlayer } from '../';

import { dist } from '../../../config/styles';
import { Asset, Annotation } from './';
import { getUrlPrefix } from '../../../helper/uploads';

const gfx = (props) => (
    <svg {...props} version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="416.000000pt" height="367.000000pt" viewBox="0 0 416.000000 367.000000"
      preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,367.000000) scale(0.100000,-0.100000)"
      fill="#000000" stroke="none">
      <path d="M135 3646 c-59 -28 -98 -66 -119 -118 -14 -33 -16 -218 -16 -1685 0
      -1636 1 -1648 21 -1693 23 -52 61 -95 104 -118 28 -16 191 -17 2033 -22 1101
      -3 2002 -2 2002 3 0 4 -12 7 -27 7 -38 1 -103 32 -132 63 l-23 25 31 46 c65
      94 61 -27 61 1726 0 1725 3 1637 -51 1710 -13 16 -45 41 -73 55 l-50 25 -1855
      0 -1856 0 -50 -24z"/>
      </g>
    </svg>
  )

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  renderAudio() {
    const file = this.props.file;
    if (!file) return false;

    return (
      <AudioPlayer src={file} />
    );
  }

  renderText(text) {
    text = text.replace(/<br\/>/g, '\n');
    const blocks = text.split('\n');
    var paragraphs = [];
    for (var i = 0; i < blocks.length; i++) {
      const e = blocks[i];
      var entry = <div key={i}>{e}</div>;
      if (e == '') entry = <div key={i}>&nbsp;</div>;
      paragraphs.push(entry);
    }
    return <div className="Text">{paragraphs}</div>;
  }

  renderSource() {
    const source = this.props.source;
    if (!source) return false;

    return <Source>{source}</Source>;
  }

  render() {
    return (
      <Container className="Quote">
        <GfxContainer>
          <Gfx />
        </GfxContainer>
        <ContentContainer>
          <Content>
            {this.renderAudio()}
            {this.props.text && this.renderText(this.props.text)}
            {this.renderSource()}
          </Content>
        </ContentContainer>
        <GfxContainer>
          <GfxBottom />
        </GfxContainer>  
      </Container>
    );
  }
}

Quote.propTypes = {
  text: PropTypes.string,
  audio: PropTypes.string
};

export default withTracker(props => {
  let file = false;
  if (props.audio) {
    const roomId = getSelectedRoomId();
    const tabId = getSelectedTabId();
    file =
      getUrlPrefix(Session.get('roomVariant')) +
      '/' +
      roomId +
      '/' +
      tabId +
      '/' +
      props.audio;
  }
  return {
    file
  };
})(Quote);

const GfxContainer = styled.div`
  width: 100%;
  height: ${ dist.medium };
  overflow: hidden;
`

const Gfx = styled(gfx)`
  width: 100%;
  height: auto;
  path {fill: rgba(255, 255, 255, 0.8);}
`

const GfxBottom = styled(Gfx)`
  transform: translateY(calc( ${ dist.medium } - 100%));
`

const Container = styled.div`
  opacity: 0.85;
  margin-bottom: 1em;
  margin-left: ${dist.tiny};
  margin-right: ${dist.tiny};  
  .AudioPlayer + .Text {
    margin-top: ${ dist.tiny };
  }
`;

const ContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding-top: ${dist.tiny};
  padding-bottom: ${dist.tiny};
  padding-left: ${dist.tiny};
  padding-right: ${dist.tiny};
  margin-right: 2.4%; /* ${dist.tiny}; */
  & audio {
    margin-bottom: ${dist.tiny};
    display: block;
  }
`;

const Content = styled.div`
  margin-top: calc( -${ dist.medium });
  margin-bottom: calc( -${ dist.medium });
`

const Source = styled.small`
  display: block;
  margin-top: ${dist.tiny};
  font-size: 80%;
  text-align: left;
`;
