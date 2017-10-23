import React, { Component, Image } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

class MenuIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FloatMenu>
        <NavLink to={'/'}>Menu</NavLink>
      </FloatMenu>
    );
  }
}

export default MenuIcon;

const FloatMenu = styled.nav`
  position: fixed;
  bottom: 2rem;
  line-height: 10rem;
  width: 10rem;
  height: 10rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  text-align: center;
  &:after {
    content:"⬢";
    font-size: 10rem;
    position: absolute;
    left:0;
    right:0;
    text-shadow: 1rem 1rem 1rem rgba(0,0,0,0.66);    
  }
  a {
    top: 0.75rem; // this depends on the relative height of the hexagon character to the line-height
    pointer-events: all;
    color:white;
    position: relative;
    z-index: 10;
  }
`


// Alternative with SVG:
/*
  <IconSvg xmlns="http://www.w3.org/2000/svg" version="1.1" width="450" height="350">
    <defs>
      <filter id="f3" >
        <feOffset result="offOut" in="SourceAlpha" dx="50" dy="50" />
        <feColorMatrix result="matrixOut" in="offOut" type="matrix"
          values={`
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 0.6 0`} />
        <feGaussianBlur result="offOut" in="blurOut" stdDeviation="30" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
    <polygon points="300,150 225,280 75,280 0,150 75,20 225,20" filter="url(#f3)"></polygon>
  </IconSvg>

const IconSvg = styled.svg.attrs({
  width: props => props.width || 100, // TODO: calculate relative lengths everywhere
}) `
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  fill:black;
  pointer-events: none;
`  
*/