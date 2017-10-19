import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ListItem extends React.Component {
  render() {
    return (
      <NavLink to={'/admin/graph/' + this.props.entry._id}>
        {this.props.entry._id}
      </NavLink>
    );
  }
}

export default ListItem;
