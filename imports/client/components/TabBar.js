import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { localeStr, existsString, exists } from '../../helper/global';
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
    if (exists(this.props.tabs)) {
      for (var i = 0; i < this.props.tabs.length; i++) {
        const tab = this.props.tabs[i];
        var className = 'Tab';

        let isSelected = selectedTabId === tab.identifier;

        if (isSelected) {
          className = 'SelectedTab';
          let content = localeStr(tab.title);
        }
        const entry = (
          <Tab
            key={'_tab' + i}
            to={'/rooms/' + this.props.roomId + '?tabId=' + tab.identifier}
            className={className}
            style={{
              backgroundColor: isSelected ? this.props.roomColor : tab.color
            }}
          >
            <TabText>{localeStr(tab.title)}</TabText>
          </Tab>
        );
        myTabs.push(entry);
      }
    }

    return <Bar className="TabBar">{myTabs}</Bar>;
  }
}

TabBar.propTypes = {
  roomId: PropTypes.string,
  roomColor: PropTypes.string,
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

const Tab = styled(NavLink)`
  ${snippets.tabText} display:block;
  min-width: calc(100% / 3);
  box-sizing: border-box;
  flex: 1;
  line-height: ${dist.medium};
  padding: 0 ${dist.small};
  text-decoration: none;
  color: black;
  white-space: no-wrap;
  transition: background-color 0.2s;
`;

const TabText = styled.span`
  ${snippets.tabText} /* position: relative;
  top: -0.03em;*/
  display: inline-block;
  .SelectedTab &,
  .Tab:hover & {
    background-image: linear-gradient(to bottom, black 33%, transparent 33%);
    background-position: 0 1.65em;
    background-repeat: repeat-x;
    background-size: 2px 6px;
  }
`;
