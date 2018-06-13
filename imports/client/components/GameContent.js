import React, { Component } from 'react';
import styled from 'styled-components';
import './css/rangeSlider.css';

import { colors, dist, snippets } from '../../config/styles';
import { getStartPopupsDelay } from '../../helper/popup';
import { localeStr, exists,existsString } from '../../helper/global';
import GameCharacterImage from './GameCharacterImage';
import Slider from 'react-rangeslider';

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
      los.push(<LosDiv key={'_' +i}>{div}</LosDiv>);
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
          key={'_' +i}
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
      const p = this.props.resultPercentNum;
      var doc = '';
      var low=false;medium=false;high=false;
      if (p <= 25) {
        doc = this.props.resultLow.doc;
        low=true;
      } else if (p > 25 && p <= 75) {
        doc = this.props.resultMedium.doc;
        medium=true;
      } else {
        doc = this.props.resultHigh.doc;
        high=true;
      }
      doc = doc.replace(/_name_/g, this.props.name);
      doc = doc.replace(/_num_/g, p);
      var docs=doc.split("\n");
      var docElems = [];
      for (var i = 0; i < docs.length; i++) {
        const e = docs[i];
        var entry = <div key={'_' +i}>{e}</div>;
        docElems.push(entry);
      }

      var match="";
      var wahre="wahre";
      var eine="eine";
      var keine="keine";
      if (this.props.selected == 0) {
        wahre="wahrer"     
        eine="ein"     
        if (low){
          match=this.props.matchYes;
        }else{
          match=this.props.matchNo;
        }
      } else if (this.props.selected == 1) {
        if (medium){
          match=this.props.matchYes;
        }else{
          match=this.props.matchNo;
        }
      } else if (this.props.selected == 2) {
        wahre="wahrer"     
        eine="ein"     
        keine="kein"     
        if (high){
          match=this.props.matchYes;
        }else{
          match=this.props.matchNo;
        }
      }
      match = match.replace(/_name_/g, this.props.name);
      match = match.replace(/_wahre_/g, wahre);
      match = match.replace(/_eine_/g, eine);
      match = match.replace(/_keine_/g, keine);
      return (
        <Content>
          <Center paddings>{docElems}</Center>
          <Title>{match}</Title>
          <Navigation>
            {prev}
            {next}
          </Navigation>
        </Content>
      );
    }
    return (
      <Content>           
        <Title>{this.props.noResult}</Title>
        <Center>&nbsp;</Center>
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
    const page = this.props.page;
    const questionNum = page - 2;
    const question = this.props.question;
    //const value = akValue;
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
    this.props.selectCallback(questionNum, value);
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
        if (existsString(answer.text)){
          labels[answer.max] = answer.text;
        }
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
        <Center>
        <StyledSlider
          min={0}
          max={question.max}
          tooltip={false}
          value={akValue}
          onChange={this.handleOnChangeSlider}
          onChangeComplete={() => {
            const value = akValue;            
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
            //this.props.selectCallback(questionNum, num);
            this.changeSel(myAnswer, questionNum, value);
          }}
          labels={labels}
          orientation="vertical"
        /></Center>
      );
    } else {
      for (var i = 0; i < question.answers.length; i++) {
        const answer = question.answers[i];
        const sel = this.props.selectedAnswers[questionNum];
        const num = i;
        const n = (<Center key={'_' + i}
        >
          <AnswerRow
            onClick={() => {
              this.changeSel(answer, questionNum, num);
            }}
            selected={sel === i}
          >
            <span>{answer.text}</span>
          </AnswerRow></Center>
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
          {answer}
        <Navigation>
          {prev}
          {next}
        </Navigation>
      </Content>
    );
  }
  getPrev(page) {
    if (page == 0) return null;
    return <Prev onClick={()=>{this.setState({sliderSel: -1});this.props.prev()}}>{this.props.prevText}</Prev>;
  }
  getNext(page) {
    if (page == 1) {
      if (this.props.selected == -1) return null;
    }
    if (page == this.props.number + 2) return null;
    return <Next onClick={()=>{this.setState({sliderSel: -1});this.props.next()}}>{this.props.nextText}</Next>;
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
    ${ snippets.headlineTextLarger};
    cursor: pointer;
  }
`

const Prev = ({ ...props, children }) => <PrevLarger {...props}>{children}</PrevLarger>
const Next = ({ ...props, children }) => <NextLarger {...props}>{children}</NextLarger>

//  ${ snippets.standardTextPaddings};



const PrevLarger = styled.div`
${ snippets.standardTextPaddings};
background-color: ${colors.lightorange};
`;

const NextLarger = styled.div`
${ snippets.standardTextPaddings};
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