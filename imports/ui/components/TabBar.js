import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { localeStr, existsString } from '../../helper/global';
import { snippets, dist } from '../../config/styles';

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

      if (selectedTabId === tab.identifier) {
        className = 'SelectedTab';
        content = localeStr(tab.title);
      }
      const entry = (
        <Tab
          key={'_tab' + i}
          to={'/rooms/' + this.props.roomId + '?tabId=' + tab.identifier}
          className={className}
          style={{ backgroundColor: tab.color }}
        >
          {localeStr(tab.title)}
        </Tab>
      );
      myTabs.push(entry);
    }

    return <Bar className="TabBar">{myTabs}</Bar>;
  }
}

TabBar.propTypes = {
  roomId: PropTypes.string,
  selectedTabId: PropTypes.string,
  preSelectedTabId: PropTypes.string,
  tabs: PropTypes.array
};

export default TabBar;

const Bar = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Tab = styled(NavLink) `
  ${snippets.tabText}
  display:block;
  min-width: calc( 100% / 3 );
  box-sizing: border-box;
  flex: 1;
  line-height: ${dist.medium};
  padding: 0 ${dist.small};
`;
