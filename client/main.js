import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/client';
import autosize from 'autosize';

import App from '../imports/ui/containers/App';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});

setTimeout(function () {
  autosize(document.querySelectorAll('textarea'));
}, 1000)
