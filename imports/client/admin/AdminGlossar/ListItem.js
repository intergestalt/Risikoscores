import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DeleteButton } from '../AdminHelpers';
import { getUrl } from '../../../helper/global';

class ListItem extends React.Component {
  render() {
    return (
      <span>
        <NavLink to={'/admin/glossar/' + getUrl(this.props.entry._id)}>
          {this.props.entry.name.de}
        </NavLink>{' '}
        ({this.props.entry._id})
        <DeleteButton
          collection={this.props.collection}
          id={this.props.entry._id}
          text={this.props.entry.name.de}
          small
          style={{ paddingLeft: '1em' }}
        />
      </span>
    );
  }
}

export default ListItem;
