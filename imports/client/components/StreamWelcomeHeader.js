import React, { Component } from 'react';
import styled from 'styled-components';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { getFragment } from '../../helper/fragment';
import { colors, dist } from '../../config/styles';
import { getLanguage } from '../../helper/actions';

class StreamWelcomeHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var title = getFragment('startTitle');

    return (
      <div className="StreamWelcomeHeader">
        <Title>{title}</Title>
      </div>
    );
  }
}

export default withTracker(props => {
  return {
    lang: getLanguage()
  };
})(StreamWelcomeHeader);

const Title = styled.h1`
color: ${colors.blue};
padding: 0 ${dist.small};
`;
