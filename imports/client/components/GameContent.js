import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import './css/rangeSlider.css';

import { colors, dist, snippets } from '../../config/styles';
import { getStartPopupsDelay } from '../../helper/popup';
import { localeStr, exists } from '../../helper/global';
import GameCharacterImage from './GameCharacterImage';

class GameContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderSel: -1
    };
    this.handleOnChangeSlider = this.handleOnChangeSlider.bind(this);
    this.changeSel = this.changeSel.bind(this);
  }
  getLos(divs) {
    los = [];
    for (var i = 0; i < divs.length; i++) {
      const div = divs[i];
      div = div.replace(/_num_/g, this.props.number);
      los.push(<LosDiv key={i}>{div}</LosDiv>);
    }
    return los;
  }

  getStart() {
    const divs = this.getLos(this.props.losText);
    return <Content>{divs}</Content>;
  }

  getSelect(page) {
    characters = [];
    for (var i = 0; i < this.props.characters.length; i++) {
      var selected = false;
      if (i == this.props.selected) {
        selected = true;
      }
      const character = this.props.characters[i];
      const asset = {
        name: character.image,
        folder: 'game'
      };
      const num = i;
      characters.push(
        <Character
          onClick={e => {
            this.props.onSelect(num);
            this.props.toast(character.comment);
          }}
          selected={selected}
          key={i}
        >
          <CharacterImage character={character} />
          <CharacterName>{character.name} {character.family}</CharacterName>
        </Character>
      );
    }
    return (
      <Content>
        {characters}
      </Content>
    );
  }
  getAnswer(page) {
    const prev = this.getPrev(page);
    const next = this.getNext(page);

    if (this.props.allAnswered) {
      const p = this.props.resultPercent;
      var doc = '';
      if (p <= 25) {
        doc = this.props.resultLow.doc;
      } else if (p > 25 && p <= 75) {
        doc = this.props.resultMedium.doc;
      } else {
        doc = this.props.resultHigh.doc;
      }
      doc = doc.replace(/_name_/g, this.props.name);
      doc = doc.replace(/_num_/g, p);
      var title = this.props.resultTitle;
      title = title.replace(/_name_/g, this.props.name);
      title = title.replace(/_num_/g, p);
      return (
        <Content>
          <Title>{title}</Title>
          <Center paddings>{doc}</Center>
          <Navigation>
            {prev}
            {next}
          </Navigation>
        </Content>
      );
    }
    return (
      <Content>
        <Center paddings>{this.props.noResult}</Center>
        <Navigation>
          {prev}
          {next}
        </Navigation>
      </Content>
    );
  }

  handleOnChangeSlider = value => {
    this.setState({
      sliderSel: value
    });
  };
  changeSel(answer, questionNum, num) {
    this.props.selectCallback(questionNum, num);
    var str = null;
    if (this.props.selected == 0) {
      str = answer.sigi;
    } else if (this.props.selected == 1) {
      str = answer.riri;
    } else if (this.props.selected == 2) {
      str = answer.per;
    }
    if (exists(str)) {
      this.props.toast(str);
    }
  }
  getAnswers(page) {
    const question = this.props.question;
    var result = [];
    const questionNum = page - 2;

    if (question.type == 'slider') {
      var labels = {};
      for (var i = 0; i < question.answers.length; i++) {
        const answer = question.answers[i];
        labels[answer.max] = answer.text;
      }

      var num = 0;
      var line = question.answer;
      var akValue = -1;
      const sel = this.props.selectedAnswers[questionNum];
      if (exists(sel)) {
        akValue = sel;
      }
      if (this.state.sliderSel >= 0) {
        akValue = this.state.sliderSel;
        line = line.replace(/_num_/g, this.state.sliderSel);
      } else {
        line = line.replace(/_num_/g, '?');
      }

      return (
        <StyledSlider
          min={0}
          max={question.max}
          tooltip={false}
          value={akValue}
          onChange={this.handleOnChangeSlider}
          onChangeComplete={() => {
            const value = this.state.sliderSel;
            var num = 0;
            var myAnswer = null;
            for (var i = 0; i < question.answers.length; i++) {
              const answer = question.answers[i];
              var min = -1;
              if (i > 0) {
                const answer2 = question.answers[i - 1];
                min = answer2.max;
              }
              if (value > min && value <= answer.max) {
                num = i;
                myAnswer = answer;
              }
            }
            this.changeSel(myAnswer, questionNum, value);
          }}
          labels={labels}
          orientation="vertical"
        />
      );
    } else {
      for (var i = 0; i < question.answers.length; i++) {
        const answer = question.answers[i];
        const sel = this.props.selectedAnswers[questionNum];
        const num = i;
        const n = (
          <AnswerRow
            onClick={() => {
              this.changeSel(answer, questionNum, num);
            }}
            key={'_' + i}
            selected={sel === i}
          >
            <span>{answer.text}</span>
          </AnswerRow>
        );
        result.push(n);
      }
    }
    return result;
  }

  getQuestions(page) {
    const prev = this.getPrev(page);
    const next = this.getNext(page);
    const answer = this.getAnswers(page);
    return (
      <Content>
        <Title>{this.props.question.text}</Title>
        <Center>
          {answer}
        </Center>
        <Navigation>
          {prev}
          {next}
        </Navigation>
      </Content>
    );
  }
  getPrev(page) {
    if (page == 0) return null;
    return <Prev onClick={this.props.prev}>{this.props.prevText}</Prev>;
  }
  getNext(page) {
    if (page == 1) {
      if (this.props.selected == -1) return null;
    }
    if (page == this.props.number + 2) return null;
    return <Next onClick={this.props.next}>{this.props.nextText}</Next>;
  }
  render() {
    const page = this.props.page;

    if (page == 0) {
      return this.getStart();
    } else if (page == 1) {
      return this.getSelect(page);
    } else if (page == this.props.number + 2) {
      return this.getAnswer(page);
    } else {
      return this.getQuestions(page);
    }
  }
}

export default GameContent;

const Content = styled.div`
  background-color: ${colors.white};
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const LosDiv = styled.div`
  padding: 0 ${dist.named.columnPadding};
  padding-top: 1em;
  &:first-child { 
    padding-top: calc(${dist.named.columnPadding} - ${dist.lineTopDiff}); 
    ${ snippets.headlineText};
  }
  background-color: ${colors.white};
`;

const Navigation = styled.div`
  display: flex;
  > * { 
    flex: 1;
    ${ snippets.standardTextPaddings};
    ${ snippets.headlineText};
    cursor: pointer;
  }
`

const Prev = ({ ...props, children }) => <PrevLarger {...props}><Larger>{children}</Larger></PrevLarger>
const Next = ({ ...props, children }) => <NextLarger {...props}><Larger>{children}</Larger></NextLarger>

const Larger = styled.span`
  transform: scale(1.5);
  display: inline-block;
`

const PrevLarger = styled.div`
  background-color: ${colors.lightorange};
`;

const NextLarger = styled.div`
  background-color: ${colors.orange};
  text-align:right;
`;

const Option = styled.div`
 background-color: ${props => (props.selected ? colors.verypaleblue : "")} !important;
 &:hover {
   background-color: ${ colors.verylightgrey};
 }
 * {
    cursor: default;
  }
 `

const Character = Option.extend`
 padding-left: ${dist.tiny}; // using padding contained in the image
 padding-right: ${dist.named.columnPadding};
 height: 33.33%;
 display: flex;
 `

const CharacterImage = styled(GameCharacterImage) `
  height: 100%;
`

const CharacterName = styled.p`
  align-self: center;
  flex: 1;
  padding-left: ${dist.named.columnPadding};
`

const Title = styled.h2`
  ${ snippets.standardTextPaddings};
  ${ snippets.headlineText};
`

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  ${ props => props.paddings ? snippets.standardTextPaddings : null}
`

const AnswerRow = Option.extend`
  ${ snippets.standardTextPaddings};
  flex:1;
  display: flex;
  > * {
    align-self: center;
  }
`;

const StyledSlider = styled(Slider) `
  height: 75% !important;
`