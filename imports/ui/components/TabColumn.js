import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { TabBar, TabContent } from './';
import { existsString, exists } from '../../helper/global';
import { getSelectedTab } from '../../helper/tab';
import { getPreSelectedTabId } from '../../helper/actions';

class TabColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var selectedTabId = this.props.selectedTabId;

    const color = this.props.roomColor;

    return (
      <Column className="TabColumn" style={{ backgroundColor: color }}>
        <TabBar
          roomId={this.props.roomId}
          roomColor={this.props.roomColor}
          selectedTabId={this.props.selectedTabId}
          preSelectedTabId={this.props.preSelectedTabId}
          tabs={this.props.tabs}
        />
        <TabContent
          tab={getSelectedTab(this.props.selectedTabId, this.props.tabs)}
          roomId={this.props.roomId}
        />
      </Column>
    );
  }
}

TabColumn.propTypes = {
  roomId: PropTypes.string,
  roomColor: PropTypes.string,
  tabs: PropTypes.array,
  selectedTabId: PropTypes.string
};

export default withTracker(props => {
  return {
    preSelectedTabId: getPreSelectedTabId()
  };
})(TabColumn);

const Column = styled.section`
  display: flex;
  flex-direction: column;
`;
