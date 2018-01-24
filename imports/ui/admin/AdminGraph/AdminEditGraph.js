import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import Graph from '../../../collections/graph';
import GraphNodeSchema from '../../../schemas/graph';
import AutoForm from 'uniforms-antd/AutoForm';
import enUS from 'antd/lib/locale-provider/en_US';
import { Button } from 'antd';

import { cleanForSave } from '../../../helper/graph';

class AdminEditGraph extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  save(doc) {
    let graph = cleanForSave(doc);
    if (!graph._id) {
      Graph.insert(graph, this.saveCallback);
    } else
      Graph.update(
        graph._id,
        {
          $set: graph
        },
        this.saveCallback
      );
  }

  delete() {
    if (confirm("delete " + this.props.graph._id + "?")) {
      console.log("delete", this.props.graph);
      this.props.history.replace("./");
      Graph.remove(this.props.graph._id, this.deleteCallback);
    }
  }

  saveCallback(error, data) {
    if (error) {
      alert('ERROR - NOT SAVED');
    } else {
      alert('SAVED');
    }
  }

  deleteCallback(error, data) {
    if (error) {
      alert('ERROR - NOT DELETED');
    }
  }

  renderForm() {
    return (
      <div>
        <br />
        <b>Id: </b> {this.props.graph._id}
        <br />
        <br />
        <AutoForm
          schema={GraphNodeSchema}
          onSubmit={doc => this.save(doc)}
          model={this.props.graph}
        />
        <Button onClick={this.delete} type="danger" icon="delete" className="DeleteButton" />
      </div>
    );
  }

  renderLoading() {
    return <div>Loading...</div>;
  }

  render() {
    return (
      <div className="AdminEditGraph">
        <h2>Edit Graph Node</h2>
        {this.props.ready ? this.renderForm() : this.renderLoading()}
      </div>
    );
  }
}

export default withTracker(props => {
  const graph_id = props.match.params._id;
  const sub = Meteor.subscribe('graph', graph_id);

  return {
    graph: Graph.findOne(graph_id),
    ready: sub.ready()
  };
})(withRouter(AdminEditGraph));
