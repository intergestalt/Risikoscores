import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DeleteButton } from '../AdminHelpers'

class ListItem extends React.Component {
  render() {
    return (
      <span>
        <NavLink to={'/admin/glossar/' + this.props.entry._id}>
          {this.props.entry.name.de}
        </NavLink>
        <DeleteButton
          collection={this.props.collection}
          id={this.props.entry._id}
          text={this.props.entry.name.de}
          small
          style={{ paddingLeft: "1em" }}
        />
      </span>
    );
  }
}

export default ListItem;
