import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Image } from './';
import {
  isTabDetail,
  getTabSlider,
  getTabDetailIndex,
  setTabDetail
} from '../../helper/actions';

class ImageDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.clickCallback = this.clickCallback.bind(this);
  }
  clickCallback(e) {
    e.preventDefault();
    setTabDetail(false, -1);
  }
  render() {
    if (!this.props.visible) {
      return null;
    }
    const slider = getTabSlider();
    //this is a list of all annotated assets;
    console.log(slider);
    const startIndex = getTabDetailIndex();
    //this is the start index.
    const asset = slider.list[startIndex];
    return (
      <div className="ImageDetailView">
        <a
          href="#"
          onClick={e => {
            this.clickCallback(e);
          }}
        >
          +
        </a>
        <Image asset={asset} />
        <div>
          Slider {startIndex} {asset.text} {asset.source}
        </div>
      </div>
    );
  }
}

export default withTracker(props => {
  return {
    visible: isTabDetail()
  };
})(ImageDetailView);
