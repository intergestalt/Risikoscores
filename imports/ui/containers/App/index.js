import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Start } from '../../pages/Start';
import { Room } from '../../pages/Room';

import { AdminRooms } from '../../admin/AdminRooms';
import { AdminEditRoom } from '../../admin/AdminEditRoom';
import { AdminOverview } from '../../admin/AdminOverview';
import { AdminEditFragment, AdminFragment } from '../../admin/AdminFragment';
import {
  AdminGlossar,
  AdminEditGlossar,
  AdminAddGlossar
} from '../../admin/AdminGlossar';
import {
  AdminQuestions,
  AdminEditQuestion,
  AdminAddQuestion
} from '../../admin/AdminQuestion';
import { AdminGraph, AdminEditGraph } from '../../admin/AdminGraph';
import AdminRoute from '../../containers/AdminRoute';

const App = appProps => (
  <Router>
    <div className="App">
      <Switch>
        <Route
          exact
          name="index"
          path="/"
          render={props => <Start {...props} {...appProps} />}
        />
        <Route
          name="room"
          path="/rooms/:_id"
          render={props => <Room {...props} {...appProps} />}
        />
        <Route
          exact
          name="admin-overview-index"
          path="/admin/"
          component={AdminOverview}
        />
        <Route
          exact
          name="admin-rooms-index"
          path="/admin/rooms"
          component={AdminRooms}
        />
        <Route
          exact
          name="admin-room-edit"
          path="/admin/rooms/:_id"
          component={AdminEditRoom}
        />
        <Route
          exact
          name="admin-glossar-index"
          path="/admin/glossar"
          component={AdminGlossar}
        />
        <Route
          exact
          name="admin-glossar-edit"
          path="/admin/glossar/:_id"
          component={AdminEditGlossar}
        />
        <Route
          exact
          name="admin-glossar-add"
          path="/admin/glossar-add"
          component={AdminAddGlossar}
        />
        <Route
          exact
          name="admin-fragment-index"
          path="/admin/fragments"
          component={AdminFragment}
        />
        <Route
          exact
          name="admin-fragment-edit"
          path="/admin/fragment/:_id"
          component={AdminEditFragment}
        />
        <Route
          exact
          name="admin-graph-index"
          path="/admin/graph"
          component={AdminGraph}
        />
        <Route
          exact
          name="admin-grpah-edit"
          path="/admin/graph/:_id"
          component={AdminEditGraph}
        />
        <Route
          exact
          name="admin-questions-index"
          path="/admin/questions"
          component={AdminQuestions}
        />
        <Route
          exact
          name="admin-question-edit"
          path="/admin/questions/:_id"
          component={AdminEditQuestion}
        />
        <Route
          exact
          name="admin-question-add"
          path="/admin/questions-add"
          component={AdminAddQuestion}
        />
      </Switch>
    </div>
  </Router>
);

App.propTypes = {
  // anything?
};

export default withTracker(appProps => {
  return {
    language: Session.get('language')
  };
})(App);

/*

<AdminRoute exact name="admin-room-edit" path="/admin/rooms/:_id" component={AdminEditRoom} {...appProps} />*/
