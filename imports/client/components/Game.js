import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

import { Close, GameBar, GameContent, GameBottom, GamePopup } from './';
import {
  setGameStarted,
  getGameStarted,
  getGameConfig
} from '../../helper/actions';
import { zuffi, exists } from '../../helper/global';
import { colors, snippets } from '../../config/styles';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selected: -1,
      toastSelected: -1,
      toast: false,
      hideToast: false,
      toastImage: '',
      popupText: '',
      selectedAnswers: {},
      resultClicked: false,
      allAnswered: false,
      moveIn: true
    };
    this.timer1 = null;
    this.timer2 = null;
    this.timer3 = null;
    this.timer4 = null;
    this.endCallback = this.endCallback.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.select = this.select.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.toast = this.toast.bind(this);
    this.resultClickedCallback = this.resultClickedCallback.bind(this);
  }
  componentWillUnmount() {
    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
    clearTimeout(this.timer3);
    clearTimeout(this.timer4);
  }
  endCallback(e) {
    this.setState({ moveIn: false });
    this.timer4 = setTimeout(() => {
      this.setState({
        page: 0,
        selected: -1,
        toastSelected: -1,
        toast: false,
        hideToast: false,
        toastImage: '',
        popupText: '',
        selectedAnswers: {},
        resultClicked: false,
        allAnswered: false,
        moveIn: true
      });

      setGameStarted(false);
    }, 200);
  }
  resultClickedCallback() {
    this.setState({
      resultClicked: true
    });
  }
  showToast(text) {
    var left = true;
    if (zuffi(100) > 50) left = false;
    var sel = this.state.selected;
    if (sel < 0) sel = 0;
    this.setState({
      toast: true,
      toastLeft: left,
      toastImage: this.props.data.characters[sel].image,
      popupText: text,
      toastSelected: sel
    });
    this.timer1 = setTimeout(() => {
      this.hideToast();
    }, 4000);
  }
  hideToast(text) {
    var tsel = this.state.toastSelected;
    if (tsel == -1) tsel = this.state.selected;
    this.setState({
      toastSelected: tsel,
      hideToast: true
    });
    this.timer2 = setTimeout(() => {
      this.setState({
        toast: false,
        hideToast: false
      });
      if (exists(text)) {
        this.showToast(text);
      }
    }, 200);
  }
  toast(text) {
    this.timer3 = setTimeout(() => {
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
      if (this.state.toast) {
        this.hideToast(text);
      } else {
        this.showToast(text);
      }
    }, 10);
  }
  select(num) {
    const oldNum = this.state.selected;
    this.setState({
      toastSelected: oldNum,
      selected: num
    });
  }
  selectAnswer(questionNum, answerNum) {
    var sel = this.state.selectedAnswers;
    sel[questionNum] = answerNum;
    this.setState({
      selectedAnswers: sel,
      allAnswered: this.getAnsweredAll()
    });
  }

  prev() {
    var newPage = this.state.page - 1;
    this.setState({ resultClicked: false, page: newPage });
    this.hideToast();
  }

  getAnswerComment() {
    const p = this.getResultPercent();
    var num = -1;
    const sel = this.state.selected;
    const data = this.props.data;

    var doc = '';
    var m = false;
    if (p <= 30) {
      num = 0;
    } else if (p > 30 && p <= 70) {
      num = 1;
    } else {
      num = 2;
    }
    result = '';
    if (exists(data)) {
      if (num == 0) {
        if (exists(data.resultLow)) {
          if (sel == 0) {
            result = data.resultLow.sigi;
          } else if (sel == 1) {
            result = data.resultLow.riri;
          } else if (sel == 2) {
            result = data.resultLow.per;
          }
        }
      } else if (num == 1) {
        if (exists(data.resultMedium)) {
          if (sel == 0) {
            result = data.resultMedium.sigi;
          } else if (sel == 1) {
            result = data.resultMedium.riri;
          } else if (sel == 2) {
            result = data.resultMedium.per;
          }
        }
      } else if (num == 2) {
        if (exists(data.resultHigh)) {
          if (sel == 0) {
            result = data.resultHigh.sigi;
          } else if (sel == 1) {
            result = data.resultHigh.riri;
          } else if (sel == 2) {
            result = data.resultHigh.per;
          }
        }
      }
    }
    if (exists(result)) return result;
    return '';
  }

  next() {
    const data = this.props.data;
    var newPage = this.state.page + 1;
    this.setState({ resultClicked: false, page: newPage });
    if (newPage == data.questions.length + 2) {
      if (this.state.allAnswered) {
        this.toast(this.getAnswerComment());
      } else {
        this.toast(data.noResult);
      }
    } else {
      this.hideToast();
    }
  }
  getAnsweredAll() {
    const questions = this.props.data.questions;
    var all = true;
    for (var i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answers = question.answers;
      var sel = this.state.selectedAnswers[i];
      if (!exists(sel)) {
        all = false;
      }
    }
    return all;
  }
  getName() {
    const data = this.props.data;
    if (this.state.selected > -1) {
      var c = data.characters[this.state.selected];
      return c.name + ' ' + c.family;
    } else {
      return '';
    }
  }

  getResultPercent() {
    var max = 0;
    var score = 0;

    const questions = this.props.data.questions;
    for (var i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answers = question.answers;
      var akMax = 0;
      var lastScore = 0;
      var sel = this.state.selectedAnswers[i];
      for (var ii = 0; ii < answers.length; ii++) {
        const answer = answers[ii];
        if (answer.score > akMax) {
          akMax = answer.score;
        }
        var min = -1;
        if (ii > 0) {
          const answer2 = answers[ii - 1];
          min = answer2.max;
          lastScore = answer2.score;
        }
        if (question.type === 'slider') {
          if (sel > min && sel <= answer.max) {
            var range = answer.max - min;
            var relSel = sel - min;
            var scoreDiff = answer.score - lastScore;
            var scoreInc = lastScore + scoreDiff * (relSel / range);
            score += scoreInc;
          }
        } else {
          if (ii == sel) {
            score += answer.score;
          }
        }
      }
      if (exists(sel)) {
        max += akMax;
      }
    }
    if (max == 0) {
      return -1;
    }
    var x = (score / max) * 100;
    return Math.round(x * 10) / 10;
  }

  getResultPercentStr() {
    const p = this.getResultPercent();
    if (p == -1) {
      return ' ? %';
    }
    return p + ' %';
  }
  getStart(page) {
    let data = this.props.data;
    return (
      <Main>
        <GameBar
          number={data.questions.length}
          page={page}
          text={data.losCaption}
        />
        <GameContent
          losText={data.losText}
          page={page}
          number={data.questions.length}
        />
        <GameBottom
          clickCallback={this.next}
          los={data.losButton}
          page={page}
        />
      </Main>
    );
  }

  getSelect(page) {
    var data = this.props.data;
    return (
      <Main>
        <GameBar
          number={data.questions.length}
          page={page}
          text={data.selectCaption}
        />
        <GameContent
          page={page}
          prev={this.prev}
          next={this.next}
          number={data.questions.length}
          characters={data.characters}
          prevText={data.prevText}
          nextText={data.nextText}
          selected={this.state.selected}
          onSelect={this.select}
          toast={this.toast}
        />
        <GameBottom
          clickCallback={this.state.selected >= 0 ? this.next : null}
          page={page}
          selected={this.state.selected}
          resultText={
            this.state.selected == -1 ? data.selectText : data.selectButton
          }
        />
      </Main>
    );
  }
  getQuestion(page) {
    var resultPercent = this.getResultPercentStr();
    var data = this.props.data;
    return (
      <Main>
        <GameBar
          number={data.questions.length}
          page={page}
          text={data.questionCaption}
        />
        <GameContent
          page={page}
          prev={this.prev}
          next={this.next}
          number={data.questions.length}
          prevText={data.prevText}
          nextText={data.nextText}
          toast={this.toast}
          question={data.questions[page - 2]}
          selected={this.state.selected}
          selectCallback={this.selectAnswer}
          selectedAnswers={this.state.selectedAnswers}
        />
        <GameBottom
          page={page}
          resultText={data.resultText}
          resultPercent={resultPercent}
        />
      </Main>
    );
  }
  getAnswer(page) {
    var data = this.props.data;
    var resultPercent = this.getResultPercentStr();
    var resultPercentNum = this.getResultPercent();
    return (
      <Main>
        <GameBar
          number={data.questions.length}
          page={page}
          text={data.answerCaption}
        />
        <GameContent
          page={page}
          prev={this.prev}
          next={this.next}
          matchYes={data.matchYes}
          matchNo={data.matchNo}
          resultLow={data.resultLow}
          resultMedium={data.resultMedium}
          resultHigh={data.resultHigh}
          resultPercent={resultPercent}
          noResult={data.noResult}
          number={data.questions.length}
          allAnswered={this.state.allAnswered}
          prevText={data.prevText}
          name={this.getName()}
          nextText={data.nextText}
          selected={this.state.selected}
          resultPercentNum={resultPercentNum}
        />
        <GameBottom
          page={page}
          resultSubtitle1={data.resultSubtitle1}
          resultSubtitle2={data.resultSubtitle2}
          resultPercent={resultPercent}
          number={data.questions.length}
          selected={this.state.selected}
          allAnswered={this.state.allAnswered}
          toast={this.toast}
          match={data.match}
          name={this.getName()}
          resultClicked={this.state.resultClicked}
          resultClickedCallBack={this.resultClickedCallback}
          noMatch={data.noMatch}
          resultText={data.resultText}
        />
      </Main>
    );
  }
  getContent(page) {
    var data = this.props.data;
    if (page == 0) {
      return this.getStart(page);
    } else if (page == 1) {
      return this.getSelect(page);
    } else if (page == data.questions.length + 2) {
      return this.getAnswer(page);
    } else {
      return this.getQuestion(page);
    }
  }

  render() {
    if (!this.props.gameStarted) {
      return null;
    }
    var data = this.props.data;
    var content = this.getContent(this.state.page);
    var character = null;
    var sel = this.state.toastSelected;
    if (sel == -1) {
      sel = this.state.selected;
    }
    if (sel >= 0) {
      character = this.props.data.characters[this.state.selected];
    }
    return (
      <Container moveIn={this.state.moveIn} className="ImageDetailView">
        <Close
          onClick={e => {
            this.endCallback(e);
          }}
        />
        {content}
        <GamePopup
          hideToast={this.state.hideToast}
          toastLeft={this.state.toastLeft}
          visible={this.state.toast}
          text={this.state.popupText}
          image={this.state.toastImage}
          character={character}
          selectedCharacter={sel}
        />
      </Container>
    );
  }
}

export default withTracker(props => {
  return {
    data: getGameConfig(),
    gameStarted: getGameStarted()
  };
})(Game);
const moveOut = keyframes`
                    0% {
                      transform-origin: bottom right;  
                      transform: scale(1);
                      opacity:1;
                    }
                    100% {
                      transform-origin: bottom right;  
                      transform: scale(0);
                      opacity:0;
                    }
                    `;
const moveIn = keyframes`
                    0% {
                      transform-origin: top left;   
                      transform: scale(0);
                      opacity:0;
                    }
                    100% {
                      transform-origin: top left;
                      transform: scale(1);
                      opacity:1;
                    }
                    `;
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100% !important;
  width: 100% !important;
  background-color: ${colors.shade};
  z-index: 11;
  ${props =>
    props.moveIn
      ? `animation: ${moveIn} 200ms;`
      : `animation: ${moveOut} 200ms;`};
`;

const Main = styled.div`
  ${snippets.bodyText};
  position: absolute;
  top: 0;
  left: 33.33%;
  height: 100% !important;
  width: 33.34% !important;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
`;
