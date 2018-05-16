import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../config/styles';
import { getStartPopupsDelay } from '../../helper/popup';
import { localeStr, exists } from '../../helper/global';
import { Image } from '.';

class GameContent extends React.Component {
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
          <CharacterImage>
            <Image asset={asset} />
          </CharacterImage>{' '}
          {character.name} {character.family}
        </Character>
      );
    }
    return (
      <Content>
        <SelectContainer>{characters}</SelectContainer>
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
          <div>{title}</div>
          <div>{doc}</div>
          {prev}
          {next}
        </Content>
      );
    }
    return (
      <Content>
        <div>{this.props.noResult}</div>
        {prev}
        {next}
      </Content>
    );
  }
  getAnswers(page) {
    const question = this.props.question;
    var result = [];
    const cols = [
      colors.verylightgrey,
      colors.lightgrey,
      colors.littlelightgrey,
      colors.mediumgrey,
      colors.darkgrey,
      colors.verydarkgrey
    ];

    if (question.type == 'slider2') {
    } else {
      for (var i = 0; i < question.answers.length; i++) {
        const answer = question.answers[i];
        var color = cols[i % cols.length];
        const questionNum = page - 2;
        const sel = this.props.selectedAnswers[questionNum];
        if (exists(sel)) {
          if (sel == i) {
            color = colors.orange;
          }
        }
        const num = i;
        const n = (
          <AnswerRow
            onClick={() => {
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
            }}
            key={'_' + i}
            color={color}
          >
            {answer.text}
          </AnswerRow>
        );
        result.push(n);
      }
    }
    return <div>{result}</div>;
  }

  getQuestions(page) {
    const prev = this.getPrev(page);
    const next = this.getNext(page);
    const answer = this.getAnswers(page);
    return (
      <Content>
        <div>{this.props.question.text}</div>
        {answer}
        {prev}
        {next}
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
  line-height: 1.1em;
  background-color: ${colors.white};
  font-family: 'Roboto Light';
  width: 100%;
`;
const LosDiv = styled.div`
  line-height: 1.2em;
  padding 0.5em 0.5em 0.5em 0.5em;
  background-color: ${colors.white};
  font-family: 'Roboto Light';
  font-size:1.5em; 
`;
const Prev = styled.div`
    position:absolute;
    line-height: 1.2em;
    padding 0.1em 0.1em 0.1em 0.1em;
    width:30%;
    border-radius: 10px;
    left:1em;
    bottom:39%;
    background-color: ${colors.orange};
    font-family: 'Roboto Light';
    font-size:1.2em; 
`;
const Next = styled.div`
  position:absolute;
  line-height: 1.2em;
  padding 0.1em 0.1em 0.1em 0.1em;
  width:30%;
  border-radius: 10px;
  right:1em;
  bottom:39%;
  background-color: ${colors.orange};
  font-family: 'Roboto Light';
  font-size:1.2em; 
`;
const SelectContainer = styled.div``;
const Character = styled.div`  
 padding 0.1em 0.1em 0.1em 0.1em;
 background-color: ${props => (props.selected ? colors.orange : colors.white)};
 `;
const CharacterImage = styled.div`
  width: 15%;
`;

const AnswerRow = styled.div`
  padding 0.1em 0.1em 0.1em 0.1em;
  background-color: ${props => props.color};
`;
