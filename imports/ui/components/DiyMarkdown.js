import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getLanguage } from '../../helper/actions';
import { diyMarkdown } from '../../helper/diyMarkdown';
import { dist } from '../../config/styles';

class DiyMarkdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const blockId = this.props.key;
    const glossar = !this.props.noGlossar
    const textBlocks = diyMarkdown(this.props.children, blockId, glossar);
    return (
      <Styled className="DiyMarkdown" {...this.props}>
        {textBlocks}
      </Styled>)
  }
}

DiyMarkdown.propTypes = {
  noGlossar: PropTypes.bool,
  key: PropTypes.string,
};

export default DiyMarkdown;

const Styled = styled.div`
  & > p:not(:last-child) {
    margin-bottom: 1em;
  }
  p {
    padding-left: ${dist.named.columnPadding};
    padding-right: ${dist.named.columnPadding};
  }
  & > *:not(.SCTimeline):first-child {
    margin-top: 1em;
  }
  .responsive-iframe-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    padding-top: 25px;
    height: 0;
    margin: 1em -${dist.named.columnPadding};
  }
  .responsive-iframe-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }  
`;