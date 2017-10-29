import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button } from 'antd';

class AdminUploads extends React.Component {

  regenerateImages() {
    Meteor.call('uploads.regenerateImages', {});
  }

  regenerateMissingImages() {
    Meteor.call('uploads.regenerateMissingImages', {});
  }

  clearCacheAndRegenerate() {
    Meteor.call('uploads.clearCache', {}, () => {
      Meteor.call('uploads.regenerateImages', {});
    });
  }

  render() {
    return (
      <div className="AdminUploads">
        <h2>Manage Cache</h2>
        <p>
          Regenerates all images. Use if images were changed. May take many minutes.<br />
          <Button onClick={this.regenerateImages}>Regenerate Images </Button>
        </p>
        <p>
          Regenerates only missing images. Use when images were added. May take several minutes.<br />
          <Button onClick={this.regenerateMissingImages}>Regenerate Missing Images</Button>
        </p>
        <p>
          Clear cache. Use when images where deleted or renamed on large scale. Takes longest.<br />
          <Button onClick={this.clearCacheAndRegenerate}>Clear Cache & Regenerate</Button>
        </p>
      </div>
    );
  }
}

export default withTracker(props => {
  //Meteor.subscribe('rooms.list');

  return {
    //rooms: Rooms.find().fetch()
  };
})(AdminUploads);
