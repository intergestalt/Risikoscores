import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import TextFragments from '../../../collections/textFragments';

import ListItem from './ListItem';
import { NavLink } from 'react-router-dom';

class AdminFragment extends React.Component {
  renderFragments(fragments) {
    return (
      <div>
        <ul>
          {fragments.map(entry => {
            return (
              <li key={entry._id}>
                <ListItem entry={entry} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="AdminFragments">
        <h2>Text Fragments</h2>
        {this.renderFragments(this.props.fragments)}
      </div>
    );
  }
}

export default withTracker(props => {
  Meteor.subscribe('fragments.list');

  return {
    fragments: TextFragments.find().fetch()
  };
})(AdminFragment);
