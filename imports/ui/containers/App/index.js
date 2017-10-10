import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Start } from '../../pages/Start';
import { Room } from '../../pages/Room';

import { AdminRooms } from '../../admin/AdminRooms';
import { AdminEditRoom } from '../../admin/AdminEditRoom';

import AdminRoute from '../../containers/AdminRoute';

const App = appProps => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact name="index" path="/" render={(props) => (<Start { ...props} {...appProps } />)}/>
        <Route exact name="admin-rooms-index" path="/admin/rooms" component={AdminRooms} />
        <Route exact name="admin-room-edit" path="/admin/rooms/:_id" component={AdminEditRoom} />
        <Route name="room" path="/rooms/:_id" render={(props) => (<Room { ...props} {...appProps } />)} />
      </Switch>
    </div>
  </Router>
);

App.propTypes = {
  // anything?
};

export default withTracker((appProps) => {
  return {
    language: Session.get('language'),
  };
})(App);


/*

<AdminRoute exact name="admin-room-edit" path="/admin/rooms/:_id" component={AdminEditRoom} {...appProps} />*/