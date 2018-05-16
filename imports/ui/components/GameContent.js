import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../config/styles';
import { getStartPopupsDelay } from '../../helper/popup';
import { localeStr } from '../../helper/global';
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
    const prev = this.getPrev(page);
    const next = this.getNext(page);
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
            this.props.toast('Text');
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
        {prev}
        {next}
      </Content>
    );
  }
  getAnswer(page) {
    const prev = this.getPrev(page);
    const next = this.getNext(page);
    return (
      <Content>
        <span>Answer</span>
        {prev}
        {next}
      </Content>
    );
  }
  getQuestions(page) {
    const prev = this.getPrev(page);
    const next = this.getNext(page);
    return (
      <Content>
        <span>Question</span>
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
