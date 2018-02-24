import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Rooms from '../../../collections/rooms';
import { variants } from '../../../config/variants';

class RoomChooser extends React.Component {
  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleSelect(event) {
    Session.set("roomVariant", event.target.value);
  }

  handleReset(event) {
    if (!confirm(`Delete ${this.props.roomVariant} content of this room and replace with content of the normal version?`)) return;
    Meteor.call("initRoomVariant", { key: this.props.roomKey, variant: this.props.roomVariant })
  }

  handleClear(event) {
    if (!confirm("Delete content of this room?")) return;
    Meteor.call("clearRoomVariant", { key: this.props.roomKey, variant: this.props.roomVariant })
  }

  handleDelete(event) {
    if (!confirm(`Delete ${this.props.roomVariant} version of this room?`)) return;
    Meteor.call("deleteRoomVariant", { key: this.props.roomKey, variant: this.props.roomVariant })
  }

  render() {
    if (this.props.disableNonExistingVariants
      && (this.props.existingVariants
        && this.props.existingVariants.length <= 1)) {
      return null
    }

    const options = variants.map(v => {
      const disabled = this.props.disableNonExistingVariants && this.props.existingVariants.indexOf(v._id) < 0
      return <Option disabled={disabled} key={v._id} value={v._id}>{v.name}</Option>
    })

    const buttons = (
      this.props.roomKey && this.props.controls ?
        <span>
          <button
            onClick={this.handleReset}
            disabled={this.props.roomVariant == "live"}
          >restore</button>
          &nbsp;
        <button
            onClick={this.handleDelete}
            disabled={this.props.roomVariant == "live"}
          >remove</button>
        </span>
        : null
    )

    return (<Container roomVariant={this.props.roomVariant} className="RoomChooser" >
      Version
      &nbsp;
      <select onChange={this.handleSelect} value={this.props.roomVariant}>
        {options}
      </select>
      &nbsp;
      {buttons}
    </Container>);
  }
}
RoomChooser.propTypes = {
  roomKey: PropTypes.string,
  disableNonExistingVariants: PropTypes.bool,
  controls: PropTypes.bool,
};

export default withTracker(props => {
  const userId = Meteor.userId();
  const roomVariant = Session.get("roomVariant");
  const existingVariants = variants;
  if (props.roomKey && props.disableNonExistingVariants) {
    const sub = Meteor.subscribe('room.variants.list');
    const docs = Rooms.find({ key: props.roomKey }).fetch()
    console.log(docs)
    existingVariants = docs.map(doc => doc.variant)
  }

  return {
    userId,
    authenticated: userId || false,
    roomVariant,
    existingVariants
  };
})(RoomChooser);

const Container = styled.div`
  display: inline-block;
  background-color: ${ props => (props.roomVariant == "live" ? "orange" : "lightgreen")};
  padding: 0.2ex 0.4ex;
  border-radius: 0.5ex;
`
const Option = styled.option`
  &[disabled] {
    opacity: 0.5;
  }
`;

/*
  position: absolute;
  top: 1.5em;
  left: 50%;
  transform: translateX(-50%);
  */