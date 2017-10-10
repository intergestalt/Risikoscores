import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withTracker } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Start } from '../../pages/Start';
import { Room } from '../../pages/Room';

import { AdminRooms } from '../../admin/AdminRooms';
import { AdminEditRoom } from '../../admin/AdminEditRoom';

import AdminRoute from '../../containers/AdminRoute';

const App = appProps => (
  <Router>
    <div className="App">
      <Switch>
        <Route exact name="index" path="/" component={Start} />
        <Route exact name="admin-rooms-index" path="/admin/rooms" component={AdminRooms} {...appProps} />
        <Route exact name="admin-room-edit" path="/admin/rooms/:_id" component={AdminEditRoom} {...appProps} />
        <Route name="room" path="/room/:_id" component={Room} />
      </Switch>
    </div>
  </Router>
);

App.propTypes = {
  // anything?
};

export default App;

/*

<AdminRoute exact name="admin-room-edit" path="/admin/rooms/:_id" component={AdminEditRoom} {...appProps} />*/