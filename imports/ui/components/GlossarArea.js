import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

import { GlossarDetail, GlossarList, GlossarExpander } from './';
import { existsString, exists } from '../../helper/global';
import Glossar from '../../collections/glossar';
import { getGlossarEntry } from '../../helper/glossar';
import {
  isQuestionsExpanded,
  isGraphExpanded,
  getGlossarDetailId
} from '../../helper/actions';
import { colors, snippets } from '../../config/styles';

class GlossarArea extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLoading() {
    return <div className="GlossarArea">Loading...</div>;
  }

  renderGlossar() {
    var content = null;
    var done = false;
    if (existsString(this.props.glossarDetailId)) {
      const glossarEntry = getGlossarEntry(
        this.props.glossar,
        this.props.glossarDetailId
      );
      if (exists(glossarEntry)) {
        content = <GlossarDetail entry={glossarEntry} />;
        done = true;
      }
    }
    if (!done) {
      content = (
        <GlossarList
          glossar={this.props.glossar}
          roomGlossar={this.props.roomGlossar}
        />
      );
    }

    //graphExpanded == true && questionsExpanded == true => height:7%
    //graphExpanded == true && questionsExpanded == false => height:34%
    //graphExpanded == false && questionsExpanded == true => height:33%
    //graphExpanded == false && questionsExpanded == false => height:60%
    var height = null;
    if (this.props.graphExpanded) {
      if (this.props.questionsExpanded) {
        height = 7;
      } else {
        height = 34;
      }
    } else {
      if (this.props.questionsExpanded) {
        height = 33;
      } else {
        height = 60;
      }
    }

    return (
      <Area relativeHeight={height} className="GlossarArea">
        <Scrollbars>
          <Title>Glossar: {height}%</Title>
          {content}
        </Scrollbars>
      </Area>
    );
  }

  render() {
    if (!this.props.ready) {
      return this.renderLoading();
    }
    return this.renderGlossar();
  }
}

GlossarArea.propTypes = {
  room: PropTypes.object,
  roomGlossar: PropTypes.object
};

export default withTracker(props => {
  const sub = Meteor.subscribe('glossar.list');

  return {
    glossar: Glossar.find().fetch(),
    questionsExpanded: isQuestionsExpanded(),
    graphExpanded: isGraphExpanded(),
    glossarDetailId: getGlossarDetailId(),
    ready: sub.ready()
  };
})(GlossarArea);

const Area = styled.div.attrs({
  relativeHeight: props => props.relativeHeight || '33.33'
}) `
  height: ${props => props.relativeHeight}%;
  //flex:  ${props => props.relativeHeight};
  background-color: ${colors.darkgrey};
  overflow-y: auto;
`;

const Title = styled.h3`
  ${snippets.headlineText};
  color: ${colors.named.glossar};
`;