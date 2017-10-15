import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ListItem extends React.Component {
  render() {
    return (
      <NavLink to={'/admin/glossar/' + this.props.entry._id}>
        {this.props.entry.name.de}
      </NavLink>
    );
  }
}

export default ListItem;
