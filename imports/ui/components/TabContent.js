import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TabContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="TabContent" />;
  }
}

TabContent.propTypes = {
  roomFolder: PropTypes.string,
  tab: PropTypes.object
};

export default TabContent;
