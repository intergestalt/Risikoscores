import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ListItem extends React.Component {
  render() {
    return (
      <NavLink to={'/admin/rooms/' + this.props.room._id}>
        {this.props.room.name.de}
      </NavLink>
    );
  }
}

export default ListItem;
