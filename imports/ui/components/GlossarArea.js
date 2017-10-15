import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { GlossarDetail, GlossarList, GlossarExpander } from './';
import { existsString, exists } from '../../helper/global';
import Glossar from '../../collections/glossar';
import { getGlossarEntry } from '../../helper/glossar';

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
        content = (
          <GlossarDetail
            entry={glossarEntry}
            glossarCallback={this.props.glossarCallback}
            closeGlossarDetail={this.props.closeGlossarDetail}
          />
        );
        done = true;
      }
    }
    if (!done) {
      content = (
        <GlossarList
          glossar={this.props.glossar}
          roomGlossar={this.props.roomGlossar}
          glossarCallback={this.props.glossarCallback}
        />
      );
    }
    var expanded = null;
    if (this.props.glossarExpanded) {
      expanded = <div>GLOSSAR EXPANDED</div>;
    }
    return (
      <div className="GlossarArea">
        {expanded}
        {content}
        <div className="GLossarExpand">
          <br />
          <GlossarExpander callBack={this.props.toggleExpandGlossar} />
        </div>
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
  roomGlossar: PropTypes.object,
  glossarDetailId: PropTypes.string,
  glossarExpanded: PropTypes.bool,
  toggleExpandGlossar: PropTypes.func,
  glossarCallback: PropTypes.func,
  closeGlossarDetail: PropTypes.func
};

export default withTracker(props => {
  const sub = Meteor.subscribe('glossar.list');
  Meteor.subscribe('glossar.list');

  return {
    glossar: Glossar.find().fetch(),
    ready: sub.ready()
  };
})(GlossarArea);
