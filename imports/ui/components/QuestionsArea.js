import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { RoomQuestions, Expander, RoomQuestionsHeader, CustomScrollbars } from './';
import { toggleQuestions, isQuestionsExpanded } from '../../helper/actions';
import { colors, dist } from '../../config/styles';

class QuestionsArea extends React.Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }

  callback(e) {
    e.preventDefault();
    toggleQuestions();
  }

  render() {
    //questionsExpanded == true => height:60%
    //questionsExpanded == false => height:33%
    var height = 33.3333;
    if (this.props.questionsExpanded) {
      height = 60;
    }
    return (
      <Area className="QuestionsArea" relativeHeight={height}>
        <Expander
          callback={this.callback}
          expanded={isQuestionsExpanded()}
          directionDown={false}
        />
        <CustomScrollbars autoHide>
          <InnerContainer>
            <RoomQuestionsHeader />
            <RoomQuestions roomId={this.props.room._id} />
          </InnerContainer>
        </CustomScrollbars>
      </Area>
    );
  }
}

QuestionsArea.propTypes = {
  room: PropTypes.object
};

export default withTracker(props => {
  return {
    questionsExpanded: isQuestionsExpanded()
  };
})(QuestionsArea);

const Area = styled.div`
  height: ${props => props.relativeHeight}%;
  //flex:  ${props => props.relativeHeight};
  background-color: ${colors.lightgrey};
  //overflow-y: auto;
  //padding: ${ dist.named.columnPadding};
  //padding-top: calc( ${ dist.named.columnPadding} - ${dist.lineTopDiff});
  position: relative;
  & .Expander {
    position: absolute;
    right:0.5em;
    top:0.5em;
    z-index:1; // because of the scrollbars
  }
`;

const InnerContainer = styled.div`
padding-top: calc( ${ dist.named.columnPadding} - ${dist.lineTopDiff});
`;