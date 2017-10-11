import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TabBar, TabContent } from './';
import { existsString, exists } from '../../helper/global';
import { getSelectedTab } from '../../helper/tab';

class TabColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="TabColumn">
        <TabBar
          selectedTabId={this.props.selectedTabId}
          preSelectedTabId={this.props.preSelectedTabId}
          tabs={this.props.tabs}
        />
        <TabContent
          tab={getSelectedTab(this.props.selectedTabId, this.props.tab)}
          roomFolder={this.props.roomFolder}
        />
      </div>
    );
  }
}

TabColumn.propTypes = {
  roomFolder: PropTypes.string,
  selectedTabId: PropTypes.string,
  preSelectedTabId: PropTypes.string,
  tabs: PropTypes.array
};

export default TabColumn;
