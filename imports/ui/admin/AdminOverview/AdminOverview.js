import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';

class AdminOverview extends React.Component {
  render() {
    return (
      <div className="AdminOverview">
        <h1>Admin Pages</h1>
        <NavLink to={'/admin/rooms/'}>Rooms</NavLink>
        <br />
        <NavLink to={'/admin/glossar/'}>Glossar</NavLink>
        <br />
        <NavLink to={'/admin/fragments/'}>Text Fragments</NavLink>
      </div>
    );
  }
}

export default AdminOverview;