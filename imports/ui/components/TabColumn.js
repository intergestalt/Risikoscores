import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { TabBar, TabContent } from './';
import { existsString, exists } from '../../helper/global';
import { getSelectedTab } from '../../helper/tab';
import { getPreselectedTabId } from '../../helper/actions';

class TabColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var selectedTabId = this.props.selectedTabId;
    if (!exists(selectedTabId)) {
      selectedTabId = getDefaultTabId(this.props.room.subsections);
    }
    return (
      <div className="TabColumn">
        <TabBar
          roomId={this.props.roomId}
          selectedTabId={this.props.selectedTabId}
          preSelectedTabId={this.props.preSelectedTabId}
          tabs={this.props.tabs}
        />
        <TabContent
          tab={getSelectedTab(this.props.selectedTabId, this.props.tabs)}
          roomFolder={this.props.roomFolder}
        />
      </div>
    );
  }
}

TabColumn.propTypes = {
  roomFolder: PropTypes.string,
  roomId: PropTypes.string,
  tabs: PropTypes.array,
  selectedTabId: PropTypes.string
};

export default withTracker(props => {
  return {
    preSelectedTabId: getPreselectedTabId()
  };
})(TabColumn);
