import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Graph from '../../../collections/graph';
import GraphNodeSchema from '../../../schemas/graph';
import AutoForm from 'uniforms-antd/AutoForm';
import enUS from 'antd/lib/locale-provider/en_US';

import { cleanForSave } from '../../../helper/graph';

class AdminEditGraph extends React.Component {
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

  saveCallback(error, data) {
    if (error) {
      alert('ERROR - NOT SAVED');
    } else {
      alert('SAVED');
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
})(AdminEditGraph);
