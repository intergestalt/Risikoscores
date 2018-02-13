import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DeleteButton } from '../AdminHelpers'

class ListItem extends React.Component {
  render() {
    return (
      <span>
        <i style={{ marginRight: '1em' }}>{this.props.entry.roomId}</i>
        <NavLink to={'/admin/questions/' + this.props.entry._id}>
          {this.props.entry.text.de}
        </NavLink>
        <DeleteButton
          collection={this.props.collection}
          id={this.props.entry._id}
          text={this.props.entry.text.de}
          small
          style={{ paddingLeft: "1em" }}
        />
      </span>
    );
  }
}

export default ListItem;
