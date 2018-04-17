import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Popups from '../../../collections/popups';

import ListItem from './ListItem';
import { NavLink } from 'react-router-dom';

class AdminPopup extends React.Component {
  renderPopups(popups) {
    console.log('HERE');
    console.log(popups);
    return (
      <div>
        <ul>
          {popups.map(entry => {
            console.log(entry);
            return (
              <li key={entry._id}>
                <ListItem entry={entry} collection={Popups} />
              </li>
            );
          })}
        </ul>
        <br />
        <NavLink to={'/admin/popup-add/'}>Add Popup</NavLink>
      </div>
    );
  }

  render() {
    return (
      <div className="AdminPopup">
        <h2>Popups</h2>
        {this.renderPopups(this.props.popups)}
      </div>
    );
  }
}

export default withTracker(props => {
  Meteor.subscribe('popups.list');

  return {
    popups: Popups.find({}, { sort: { targetRoomId: 1 } }).fetch()
  };
})(AdminPopup);
