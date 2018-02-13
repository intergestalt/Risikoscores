import React, { Component } from 'react';

class DeleteButton extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.remove = this.remove.bind(this)
  }

  remove(Collection, _id, text) {
    Collection.remove(
      { _id },
      this.removeCallback
    );
  }

  removeCallback(error, data) {
    if (error) {
      alert('ERROR - NOT REMOVED');
    } else {
      //alert('REMOVED');
    }
  }

  handleClick() {
    if (!confirm(`DELETE: "${this.props.text}" ???`)) return;
    this.remove(
      this.props.collection,
      this.props.id,
      this.props.text
    )
  }


  render() {
    const buttonStyle = {
      paddingLeft: "0.5ex",
      paddingRight: "0.5ex",
      color: "darkred",
      border: "1px darkred solid",
      borderRadius: "0.5ex",
      cursor: "pointer",
    }
    const button = <button style={buttonStyle} className="DeleteButton" onClick={this.handleClick} title={`delete ${this.props.id}`}>Delete</button>
    if (this.props.small) {
      return (
        <small style={this.props.style}>{button}</small>
      );
    } else {
      return (
        <span style={this.props.style}>
          button
        </span>
      );
    }
  }
}

export default DeleteButton;
