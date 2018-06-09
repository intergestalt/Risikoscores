import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getLanguage } from '../../helper/actions';
import { dist } from '../../config/styles';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    var timeout = null;
    this.state = {
      hide: true
    };
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ hide: false });
    }, 1000);
  }

  render() {
    if (!this.props.language || this.state.hide)
      return <Container key="_Loading" className="Loading" />;
    const word = this.props.language == 'de' ? 'Lädt' : 'Loading';
    return (
      <Container key="_Loading" className="Loading">
        {word}...
      </Container>
    );
  }
}

Loading.propTypes = {};

export default withTracker(props => {
  return {
    language: getLanguage()
  };
})(Loading);

const Container = styled.div`
  padding: ${dist.named.columnPadding};
`;
