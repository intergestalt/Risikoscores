import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ListItem extends React.Component {
  render() {
    return (
      <NavLink to={'/admin/rooms/' + this.props.room.key}>
        {this.props.room.name.de} <small style={{ opacity: 0.5 }}>&lt;&lt;&lt;Link:{this.props.room.name.de};{this.props.room.key}&gt;&gt;&gt;</small>
      </NavLink>
    );
  }
}

export default ListItem;
