import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Glossar from '../../../collections/glossar';

import ListItem from './ListItem';
import { NavLink } from 'react-router-dom';

class AdminGlossar extends React.Component {
  renderGlossar(glossar) {
    return (
      <div>
        <ul>
          {glossar.map(entry => {
            return (
              <li key={entry._id}>
                <ListItem entry={entry} collection={Glossar} />
              </li>
            );
          })}
        </ul>
        <br />
        <NavLink to={'/admin/glossar-add/'}>Add Glossar entry</NavLink>
      </div>
    );
  }

  render() {
    return (
      <div className="AdminGlossar">
        <h2>Glossar</h2>
        {this.renderGlossar(this.props.glossar)}
      </div>
    );
  }
}

export default withTracker(props => {
  Meteor.subscribe('glossar.list');

  return {
    glossar: Glossar.find({}, { sort: { "name.de": 1 } }).fetch()
  };
})(AdminGlossar);
