import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DeleteButton } from '../AdminHelpers';

class ListItem extends React.Component {
  render() {
    return (
      <span>
        <NavLink to={'/admin/rooms/' + this.props.room.key}>
          {this.props.room.name.de}{' '}
          <small style={{ opacity: 0.5 }}>
            &lt;&lt;&lt;Link:{this.props.room.name.de};{this.props.room.key}&gt;&gt;&gt;
          </small>
        </NavLink>
      </span>
    );
  }
}
/*        <DeleteButton
          collection={this.props.collection}
          id={this.props.room._id}
          text={this.props.room.name.de}
          small
          style={{ paddingLeft: '1em' }}
        />*/
export default ListItem;
