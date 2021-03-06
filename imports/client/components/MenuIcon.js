import React, { Component, Image } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { getFragment } from '../../helper/fragment';
import { getLanguage } from '../../helper/actions';

class MenuIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }
    this.clickCallback = this.clickCallback.bind(this);
  }
  componentDidMount() {
    this.setState({ mounted: true }) // this doesn't work as expected because the router does not dismount
  }
  clickCallback(e) {
    e.preventDefault();
    const lang = getLanguage();
    var path = '/?language=' + lang;
    this.props.history.push(path);
  }
  render() {
    var lang = getLanguage();
    return (
      <FloatMenu mounted={this.state.mounted}>
        <a
          href="#"
          onClick={e => {
            this.clickCallback(e);
          }}
        >
          <IconSvg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="f3" x="0" y="0" width="150%" height="150%">
                <feOffset result="offOut" in="SourceGraphic" dx="12" dy="12" />
                <feColorMatrix
                  result="matrixOut"
                  in="offOut"
                  type="matrix"
                  values={`
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 0.65 0`}
                />
                <feGaussianBlur
                  result="blurOut"
                  in="matrixOut"
                  stdDeviation="6"
                />
                <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
              </filter>
            </defs>
            <polygon points="120,50 88,100 28,100 0,50 28,0 88,0" />
          </IconSvg>
          <Text>{getFragment('menuIcon')}</Text>
        </a>
      </FloatMenu>
    );
  }
}

export default withRouter(MenuIcon);

const FloatMenu = styled.nav`
  position: fixed;
  bottom: 2.5rem;
  line-height: 100px;
  width: 120px;
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  text-align: center;
  z-index: 1;
  a {
    height: inherit;
    width: inherit;
    line-height: inherit;
    pointer-events: all;
    color: white;
    position: relative;
    z-index: 10;
    display: block;
    pointer-events: none;
    transition: all 1s 0.8s;  
    -webkit-filter: drop-shadow(${ props => props.mounted ? "12" : "4"}px ${props => props.mounted ? "12" : "4"}px 5px rgba(0, 0, 0, 0.75));
    filter: drop-shadow(${ props => props.mounted ? "12" : "4"}px ${props => props.mounted ? "12" : "4"}px 5px rgba(0, 0, 0, 0.75));
  }
`;

const IconSvg = styled.svg.attrs({
  width: props => props.width || 120 * 1.5,
  height: props => props.height || 100 * 1.5
})`
  position: fixed;
  left: 50%;
  transform: translateX(-33%);
  fill: black;
  pointer-events: none;
  polygon {
    pointer-events: all;
    cursor: pointer;
  }
`;
const Text = styled.span`
  position: relative;
`;
