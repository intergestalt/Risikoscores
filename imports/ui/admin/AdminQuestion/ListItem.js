import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ListItem extends React.Component {
  render() {
    return (
      <NavLink to={'/admin/questions/' + this.props.entry._id}>
        {this.props.entry.roomId} {this.props.entry.text.de}
      </NavLink>
    );
  }
}

export default ListItem;
