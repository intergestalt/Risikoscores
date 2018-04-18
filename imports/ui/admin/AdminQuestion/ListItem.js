import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DeleteButton } from '../AdminHelpers';
import { exists } from '../../../helper/global';

class ListItem extends React.Component {
  render() {
    var target = null;
    if (exists(this.props.entry.originRoomId)) {
      target = this.props.entry.originRoomId + ' -> ';
    }
    return (
      <span>
        <i style={{ marginRight: '1em' }}>
          {target}
          {this.props.entry.roomId}
        </i>
        <NavLink to={'/admin/questions/' + this.props.entry._id}>
          {this.props.entry.text.de}
        </NavLink>
        <DeleteButton
          collection={this.props.collection}
          id={this.props.entry._id}
          text={this.props.entry.text.de}
          small
          style={{ paddingLeft: '1em' }}
        />
      </span>
    );
  }
}

export default ListItem;
