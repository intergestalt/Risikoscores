import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import filterDOMProps from 'uniforms/filterDOMProps';

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

    if (!this.props.authenticated) {
      return <AccountsUIWrapper />
    }

    else return (
      <AdminWrapper>
        <Route {...rest} render={(props) => {
          return React.createElement(component, { ...props })
        }} />
      </AdminWrapper>
    )
  };
}

class AdminWrapper extends React.Component {

  render() {
    return (
      <div class="AdminWrapper" style={{ backgroundColor: "#fdfdfd" }}>
        <link href='/vendor/antd/antd.css' type="text/css" rel="stylesheet" />
        <nav><Link to="/admin">Home</Link></nav>
        {this.props.children}
      </div>
    )
  };
}


/*
const AdminRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => {
    console.log(props)
    return props.authenticated ?
      (React.createElement(component, { ...props, loggingIn, authenticated })) :
      (<AccountsUIWrapper />);
  }} />
);
*/

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


export default withTracker(props => {
  const loggingIn = Meteor.loggingIn();
  const userId = Meteor.userId();
  return {
    authenticated: true // !loggingIn && !!userId,
  };
})(AdminRoute);
