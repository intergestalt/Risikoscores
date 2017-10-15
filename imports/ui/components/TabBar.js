import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { localeStr, existsString } from '../../helper/global';

class TabBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var myTabs = [];
    var selectedTabId = this.props.selectedTabId;
    if (existsString(this.props.preSelectedTabId)) {
      selectedTabId = this.props.preSelectedTabId;
    }
    for (var i = 0; i < this.props.tabs.length; i++) {
      const tab = this.props.tabs[i];
      var className = 'Tab';

      var content = (
        <NavLink
          to={'/rooms/' + this.props.roomId + '?tabId=' + tab.identifier}
        >
          {localeStr(tab.title)}
        </NavLink>
      );
      if (selectedTabId === tab.identifier) {
        className = 'SelectedTab';
        content = localeStr(tab.title);
      }
      const entry = (
        <div
          key={'_tab' + i}
          className={className}
          style={{ backgroundColor: tab.color }}
        >
          {content}
        </div>
      );
      myTabs.push(entry);
    }

    return <div className="TabBar">{myTabs}</div>;
  }
}

TabBar.propTypes = {
  roomId: PropTypes.string,
  selectedTabId: PropTypes.string,
  preSelectedTabId: PropTypes.string,
  tabs: PropTypes.array
};

export default TabBar;
