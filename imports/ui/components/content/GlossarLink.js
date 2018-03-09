import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Glossar from '../../../collections/glossar';
import { showGlossarDetail } from '../../../helper/actions';
import { colors } from '../../../config/styles';
import { getLanguage } from '../../../helper/actions';

class GlossarLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var dummy = '';
    const doc = this.props.doc;
    const title = (doc && doc.name && this.props.lang) ? doc.name[this.props.lang] : null
    return (
      <A
        className="SCGlossarLink"
        href="#"
        title={title || `${this.props.entry} ⚠`}
        highlighted={this.props.highlighted}
        onClick={e => {
          e.preventDefault();
          showGlossarDetail(this.props.entry);
        }}
      >
        {this.props.text}{dummy}
        {!title && '⚠'}
      </A>
    );
  }
}
GlossarLink.propTypes = {
  text: PropTypes.string,
  entry: PropTypes.string,
  highlighted: PropTypes.bool
};

export default withTracker(props => {
  const sub = Meteor.subscribe('glossar.list'); // SubsManager to the rescue!
  return {
    doc: Glossar.findOne({ _id: props.entry }),
    lang: getLanguage(),
    ready: sub.ready()
  }
})(GlossarLink);

const A = styled.a`
  color: ${colors.named.glossar};
  .GlossarArea & {
    opacity: ${ props => props.highlighted ? 1 : 0.5};
  }
  .GlossarDetail & {
    opacity: 1;
  }
  .GlossarList & {
    color: white;
  }  
`

// ${ colors.named.glossar}