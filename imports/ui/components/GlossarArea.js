import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from 'color';

import { GlossarDetail, GlossarList, GlossarExpander, CustomScrollbars } from './';
import { existsString, exists } from '../../helper/global';
import Glossar from '../../collections/glossar';
import { getGlossarEntry } from '../../helper/glossar';
import {
  isQuestionsExpanded,
  isGraphExpanded,
  getGlossarDetailId
} from '../../helper/actions';
import { colors, snippets, dist } from '../../config/styles';

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
        height = 33.3333;
      }
    } else {
      if (this.props.questionsExpanded) {
        height = 33.3333;
      } else {
        height = 60;
      }
    }

    return (
      <Area relativeHeight={height} className="GlossarArea">
        <CustomScrollbars autoHide>
          <InnerContainer>
            {content}
          </InnerContainer>
        </CustomScrollbars>
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

const Area = styled.div`
  height: ${props => props.relativeHeight}%;
  //flex:  ${props => props.relativeHeight};
  background-color: ${colors.darkgrey};
  //overflow-y: auto;
  position: relative;
  &:after {
    position: absolute;
    bottom: 0;  
    height: 3em;
    width: 100%;
    content: "";
    background: linear-gradient(to top,
       ${color(colors.darkgrey).darken(0.2).opaquer(0.8).string()} 0%, 
       ${color(colors.darkgrey).darken(0.05).fade(1).string()} 80%
    );
    pointer-events: none;
  }
`;

const InnerContainer = styled.div`
  padding: ${ dist.named.columnPadding};
  padding-top: calc( ${ dist.named.columnPadding} - ${dist.lineTopDiff});
`;