import React, { Component, Image } from 'react';
import { NavLink } from 'react-router-dom';

class MenuIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MenuIcon">
        <NavLink to={'/'}>Menu</NavLink>
      </div>
    );
  }
}

export default MenuIcon;
