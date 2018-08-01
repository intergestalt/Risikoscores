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

/**** config ****/

const gfxTopDist = "21px"
const gfxBottomDist = "38px"
const bgColor= "rgba(255, 255, 255, 0.8)";

/**** component *****/

const gfx = (props) => (
    <svg {...props} version="1.0" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="-141 -9 417 366" xmlSpace="preserve">
      <path d="M274.4,356.2c-9.4,0-13.6-9.6-15.6-20.5c4.3-6.9,7.2-16,7.2-28.1V16.1c0,0,0-25.1-25-25.1h-356.7
        c0,0-25.3,0.1-25.3,25.1V332c0,0,0.3,25,25.3,25h330.2c0,0,15.3,0.6,29.2-7.2c8.1,6.3,23.2,7.2,29.2,7.2c1.5,0,3.1-0.2,3.1-0.4
        C276,356.4,275.5,356.2,274.4,356.2z"/>
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
    const onlyAudio = !this.props.text && !this.props.source
    console.log(onlyAudio)
    return (
      <Container className="Quote">
        <GfxContainer>
          <Gfx />
        </GfxContainer>
        <ContentContainer onlyAudio={onlyAudio}>
          <Content>
            {this.renderAudio()}
            {this.props.text && this.renderText(this.props.text)}
            {this.renderSource()}
          </Content>
        </ContentContainer>
        <GfxBottomContainer>
          <GfxBottom />
        </GfxBottomContainer>  
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

/***** styles *****/

const Container = styled.div`
  position: relative;
  opacity: 0.85;
  margin-bottom: 1em;
  margin-left: ${dist.tiny};
  margin-right: ${dist.tiny};  
  .AudioPlayer + .Text {
    margin-top: ${ dist.tiny };
  }
`;

const GfxContainer = styled.div`
  width: 100%;
  height: ${ gfxTopDist };
  overflow: hidden;
`

const GfxBottomContainer = styled(GfxContainer)`
  height: ${ gfxBottomDist };
`

const Gfx = styled(gfx)`
  width: 100%;
  height: auto;
  path {fill: ${bgColor} }
`

const GfxBottom = styled(Gfx)`
  transform: translateY(calc( ${ gfxBottomDist } - 100%));
`

const ContentContainer = styled.div`
  background-color: ${ bgColor };
  position: relative;
  z-index: 1;
  padding-top: ${dist.tiny};
  padding-bottom: ${dist.tiny};
  padding-left: ${dist.tiny};
  padding-right: ${dist.tiny};
  margin-right: 2.4%; /* ${dist.tiny}; */
  ${ (props) => (props.onlyAudio ? "position:absolute; right:0; left:0; background-color:transparent;" : "")}
  & audio {
    margin-bottom: ${dist.tiny};
    display: block;
  }
`;

const Content = styled.div`
  margin-top: calc( -${ gfxTopDist });
  margin-bottom: calc( -${ gfxBottomDist });
`

const Source = styled.small`
  display: block;
  margin-top: ${dist.tiny};
  font-size: 80%;
  text-align: left;
  z-index: 1;
  position: relative;
`;
