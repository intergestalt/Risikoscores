import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GlossarExpander extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="GlossarExpander">
        <a
          href="#"
          onClick={e => {
            this.props.callBack(e);
          }}
        >
          toggle
        </a>
      </div>
    );
  }
}

GlossarExpander.propTypes = {
  callBack: PropTypes.func
};

export default GlossarExpander;
