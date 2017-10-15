import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExternalLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var url = this.props.url;
    if (!url.startsWith('http://')) {
      url = 'http://' + url;
    }
    return (
      <a className="SCExternalLink" target="_blank" href={url}>
        {this.props.text}
      </a>
    );
  }
}
ExternalLink.propTypes = {
  url: PropTypes.string,
  href: PropTypes.string
};

export default ExternalLink;
