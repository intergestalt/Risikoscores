import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { toggleGlossar } from '../../helper/actions';

class Expander extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = 'arrow up';
    if (this.props.expanded) {
      text = 'arrow down';
    }
    return (
      <div className="Expander">
        <a
          href="#"
          onClick={e => {
            this.props.callback(e);
          }}
        >
          {text}
        </a>
      </div>
    );
  }
}

Expander.propTypes = {
  expanded: PropTypes.bool,
  callback: PropTypes.func
};

export default Expander;
