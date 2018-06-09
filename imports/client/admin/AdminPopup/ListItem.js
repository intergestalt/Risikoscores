import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DeleteButton } from '../AdminHelpers';
import { getUrl, exists } from '../../../helper/global';

class ListItem extends React.Component {
  render() {
    var title = null;
    if (exists(this.props.entry.title)) {
      title = this.props.entry.title.de;
    }
    return (
      <span>
        <NavLink to={'/admin/popups/' + getUrl(this.props.entry._id)}>
          {this.props.entry.targetRoomId}: {title} ({this.props.entry.key})
        </NavLink>
        <DeleteButton
          collection={this.props.collection}
          id={this.props.entry._id}
          text={this.props.entry.key}
          small
          style={{ paddingLeft: '1em' }}
        />
      </span>
    );
  }
}

export default ListItem;
