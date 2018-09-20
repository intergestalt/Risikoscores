import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Spin } from 'antd';
import dateformat from 'dateformat';

import { dateformat_backup } from '../../../config/database-backups';

class AdminDatabase extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
    }
  }

  componentDidMount = () => {
    this.getFiles()
  }

  getFiles = () => {
    Meteor.call("backups.getFiles", (error, files) => {
      console.log(files)
      this.setState({
        files
      })
    })
  }

  renderListItem = item => {
    const restored = this.props.restoredItem && this.props.restoredItem.name == item.name
    const latest = this.props.latestName == item.name
    return (
      <li key={JSON.stringify(item)}>
        <button style={{ marginRight: "1em" }} className="WarnButton" onClick={() => this.handleRestore(item)}>restore</button>
        <button style={{ marginRight: "1em" }} className="DeleteButton" onClick={() => this.handleDelete(item)}>delete</button>
        <a href={item.url}>{item.name}</a>
        <span className="restored">{restored && "<--- restored"}</span>
        <span className="latest">{latest && "<--- latest"}</span>
      </li>
    )
  }

  handleBackup = () => {
    const self = this
    Meteor.call('backups.doBackup', (error, result) => {
      console.log("backup result", error, result)
      if (error === undefined && typeof (result) === "string") {
        Session.set("latestName", result)
      }
      self.getFiles()
    })
  }

  handleRestore = (item) => {

    if (!confirm(`Restore Database and loose all changes that were made after the backup?`)) return;

    const self = this
    Meteor.call('backups.doRestore', item, (error, result) => {
      console.log(error, result)
      if (result.name) {
        Session.set("restoredItem", result)
        setTimeout(() => alert(`Restored database from ${result.name}`), 100)
      }

      self.getFiles()
    })
  }

  handleDelete = (item) => {
    const self = this
    Meteor.call('backups.delete', item, (error, result) => {
      console.log(error, result)
      self.getFiles()
    })
  }

  render() {
    const status = this.props.status;
    const items = this.state.files.map(this.renderListItem)

    return (
      <div className="AdminDatabase">
        <h1>Database Backups</h1>
        <Button onClick={this.handleBackup}>Backup Database now</Button>
        <br /><br />
        <code style={{ whiteSpace: "pre" }}>
          Date scheme: {dateformat_backup}
          <br />
          Now:         {dateformat(dateformat_backup)}
        </code>
        <ul style={{ marginTop: "2em" }}>
          {items}
        </ul>
        <br />
      </div >
    );
  }
}

export default withTracker(props => {
  return {
    latestName: Session.get("latestName"),
    restoredItem: Session.get("restoredItem")
  }
})(AdminDatabase);
