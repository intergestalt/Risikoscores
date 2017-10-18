import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { GlossarDetail, GlossarList, GlossarExpander } from './';
import { existsString, exists } from '../../helper/global';
import Glossar from '../../collections/glossar';
import { getGlossarEntry } from '../../helper/glossar';
import { isGlossarExpanded, getGlossarDetailId } from '../../helper/actions';

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

    var expander = null;
    if (!this.props.glossarExpanded) {
      expander = (
        <div className="GLossarExpand">
          <GlossarExpander glossarExpanded={this.props.glossarExpanded} />
        </div>
      );
    }
    return (
      <div className="GlossarArea">
        {content}
        {expander}
      </div>
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
    glossarExpanded: isGlossarExpanded(),
    glossarDetailId: getGlossarDetailId(),
    ready: sub.ready()
  };
})(GlossarArea);
