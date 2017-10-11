import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="TabBar" />;
  }
}

TabBar.propTypes = {
  selectedTabId: PropTypes.string,
  preSelectedTabId: PropTypes.string,
  tabs: PropTypes.array
};

export default TabBar;
