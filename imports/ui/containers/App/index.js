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
  AdminPopup,
  AdminEditPopup,
  AdminAddPopup
} from '../../admin/AdminPopup';
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
          parent={{ path: '/admin/rooms', text: 'Rooms' }}
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
          parent={{ path: '/admin/glossar', text: 'Glossar' }}
          component={AdminEditGlossar}
        />
        <AdminRoute
          exact
          name="admin-glossar-add"
          path="/admin/glossar-add"
          parent={{ path: '/admin/glossar', text: 'Glossar' }}
          component={AdminAddGlossar}
        />
        <AdminRoute
          exact
          name="admin-popups-index"
          path="/admin/popups"
          component={AdminPopup}
        />
        <AdminRoute
          exact
          name="admin-popup-edit"
          path="/admin/popups/:_id"
          parent={{ path: '/admin/popups', text: 'Popups' }}
          component={AdminEditPopup}
        />
        <AdminRoute
          exact
          name="admin-popup-add"
          path="/admin/popup-add"
          parent={{ path: '/admin/popups', text: 'Popups' }}
          component={AdminAddPopup}
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
          parent={{ path: '/admin/fragments', text: 'Fragments' }}
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
          parent={{ path: '/admin/graph', text: 'Graph' }}
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
          parent={{ path: '/admin/questions', text: 'Questions' }}
          component={AdminEditQuestion}
        />
        <AdminRoute
          exact
          name="admin-question-add"
          path="/admin/questions-add"
          parent={{ path: '/admin/questions', text: 'Questions' }}
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

export default App;

/*

<AdminRoute exact name="admin-room-edit" path="/admin/rooms/:_id" component={AdminEditRoom} {...appProps} />*/
