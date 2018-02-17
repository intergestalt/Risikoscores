import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import filterDOMProps from 'uniforms/filterDOMProps';
import autosize from 'autosize';

import AccountsUIWrapper from '../../admin/AccountsUIWrapper.jsx';

// filterDOMProps.register('systems');


class AdminRoute extends React.Component {

  wrapped(component) {
    return (
      <AdminWrapper>{React.createElement(component)}</AdminWrapper>
    )
  }

  render() {
    ({ component, ...rest } = this.props);

    return (
      <AdminWrapper authenticated={this.props.authenticated}>
        <Route {...rest} render={(props) => {
          return React.createElement(component, { ...props })
        }} />
      </AdminWrapper>
    )
  };
}

class AdminWrapper extends React.Component {

  componentDidMount() {
    this.check = setInterval(function () {
      autosize(document.querySelectorAll('textarea'));
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.check)
  }

  render() {
    return (
      <div className="AdminWrapper" style={{ backgroundColor: "#fdfdfd" }}>
        <link href='/vendor/antd/antd.css' type="text/css" rel="stylesheet" />
        <nav>
          <Link style={{ paddingRight: "1em" }} to="/admin"><b>Home</b></Link>
          <Link style={{ paddingRight: "1em" }} to="/" target="preview">Site</Link>
          <AccountsUIWrapper />
        </nav>
        {this.props.authenticated && this.props.children}
      </div>
    )
  };
}


export default withTracker(props => {
  const loggingIn = Meteor.loggingIn();
  const userId = Meteor.userId();
  return {
    authenticated: !loggingIn && !!userId,
  };
})(AdminRoute);
