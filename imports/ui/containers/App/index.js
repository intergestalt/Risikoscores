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
import { AdminUploads } from '../../admin/AdminUploads';
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
        <AdminRoute
          exact
          name="admin-overview-index"
          path="/admin/"
          component={AdminOverview}
        />
        <AdminRoute
          exact
          name="admin-rooms-index"
          path="/admin/rooms"
          component={AdminRooms}
        />
        <AdminRoute
          exact
          name="admin-room-edit"
          path="/admin/rooms/:_id"
          component={AdminEditRoom}
        />
        <AdminRoute
          exact
          name="admin-glossar-index"
          path="/admin/glossar"
          component={AdminGlossar}
        />
        <AdminRoute
          exact
          name="admin-glossar-edit"
          path="/admin/glossar/:_id"
          component={AdminEditGlossar}
        />
        <AdminRoute
          exact
          name="admin-glossar-add"
          path="/admin/glossar-add"
          component={AdminAddGlossar}
        />
        <AdminRoute
          exact
          name="admin-fragment-index"
          path="/admin/fragments"
          component={AdminFragment}
        />
        <AdminRoute
          exact
          name="admin-fragment-edit"
          path="/admin/fragment/:_id"
          component={AdminEditFragment}
        />
        <AdminRoute
          exact
          name="admin-graph-index"
          path="/admin/graph"
          component={AdminGraph}
        />
        <AdminRoute
          exact
          name="admin-graph-edit"
          path="/admin/graph/:_id"
          component={AdminEditGraph}
        />
        <AdminRoute
          exact
          name="admin-questions-index"
          path="/admin/questions"
          component={AdminQuestions}
        />
        <AdminRoute
          exact
          name="admin-question-edit"
          path="/admin/questions/:_id"
          component={AdminEditQuestion}
        />
        <AdminRoute
          exact
          name="admin-question-add"
          path="/admin/questions-add"
          component={AdminAddQuestion}
        />
        <AdminRoute
          exact
          name="admin-uploads-index"
          path="/admin/uploads"
          component={AdminUploads}
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
