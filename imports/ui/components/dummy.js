import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';

class Dummy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="Dummy" />;
  }
}
Dummy.propTypes = {
  dummy: PropTypes.array
};

export default withTracker(props => {
  return {
    language: Session.get('language')
  };
})(Dummy);
