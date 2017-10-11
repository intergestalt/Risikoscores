import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/startup/client';

import App from '../imports/ui/containers/App';

console.log('start');

Meteor.startup(() => {
  console.log('startup');
  render(<App />, document.getElementById('render-target'));
});
