import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import filterDOMProps from 'uniforms/filterDOMProps';

import AccountsUIWrapper from '../../admin/AccountsUIWrapper.jsx';

// filterDOMProps.register('systems');


const AdminRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (loggingIn) return <div>Logging in...</div>;
    return authenticated ?
    (React.createElement(component, { ...props, loggingIn, authenticated })) :
    (<AccountsUIWrapper />);
  }} />
);


/*
class AdminRoute extends React.Component {

  authorizedContent = () =>{
    return (
      <div className="AdminRoute">
        <nav>
          <AccountsUIWrapper />
          {/*!this.props.hideMenu && <Menu router={this.props.router} />*//*}
        </nav>
        <div className="main">
          {this.props.children}
          <Alert position='top-left'
            effect='slide'
            timeout={1500}
          />
        </div>
      </div>
    );
  }

  unauthorizedContent() {
    return (
      <div className="AdminRoute">
        <nav>
          <AccountsUIWrapper />
        </nav>
      </div>
    );
  }

  render() {
    // console.log(this.props.router)
    return this.props.authenticated ? this.authorizedContent() : this.unauthorizedContent();
  }
}
*/

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const userId = Meteor.userId();
  return {
    authenticated: true // !loggingIn && !!userId,
  };
}, AdminRoute);
