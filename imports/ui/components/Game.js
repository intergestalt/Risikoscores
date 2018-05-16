import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import styled from 'styled-components';

import { Close, GameBar, GameContent, GameBottom, GamePopup } from './';
import {
  setGameStarted,
  getGameStarted,
  getGameConfig
} from '../../helper/actions';
import { zuffi, exists } from '../../helper/global';
import { colors } from '../../config/styles';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      selected: -1,
      toast: false,
      hideToast: false,
      toastImage: '',
      popupText: '',
      selectedAnswers: {},
      resultClicked: false,
      allAnswered: false
    };
    this.timer1 = null;
    this.timer2 = null;
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
  }
  endCallback(e) {
    this.setState({
      page: 0,
      selected: -1,
      toast: false,
      hideToast: false,
      toastImage: '',
      popupText: '',
      selectedAnswers: {},
      resultClicked: false,
      allAnswered: false
    });
    setGameStarted(false);
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
      popupText: text
    });
    this.timer1 = setTimeout(() => {
      this.hideToast();
    }, 3000);
  }
  hideToast(text) {
    this.setState({
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
    this.setState({
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

  next() {
    var newPage = this.state.page + 1;
    this.setState({ resultClicked: false, page: newPage });
    this.hideToast();
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
      var sel = this.state.selectedAnswers[i];
      for (var ii = 0; ii < answers.length; ii++) {
        const answer = answers[ii];
        if (answer.score > akMax) {
          akMax = answer.score;
        }
        if (exists(sel)) {
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
    var x = score / max * 100;
    return Math.round(x * 10) / 10;
  }

  getResultPercentStr() {
    const p = this.getResultPercent();
    if (p == -1) {
      return ' - %';
    }
    return p + ' %';
  }
  getStart(page) {
    let data = this.props.data;
    return (
      <span>
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
      </span>
    );
  }
  getSelect(page) {
    var data = this.props.data;
    var resultPercent = this.getResultPercentStr();
    return (
      <span>
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
          resultText={
            this.state.selected == -1 ? data.selectText : data.selectButton
          }
        />
      </span>
    );
  }
  getQuestion(page) {
    var resultPercent = this.getResultPercentStr();
    var data = this.props.data;
    return (
      <span>
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
      </span>
    );
  }
  getAnswer(page) {
    var data = this.props.data;
    var resultPercent = this.getResultPercent();
    return (
      <span>
        <GameBar
          number={data.questions.length}
          page={page}
          text={data.answerCaption}
        />
        <GameContent
          page={page}
          prev={this.prev}
          next={this.next}
          resultTitle={data.resultTitle}
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
        />
        <GameBottom
          page={page}
          resultSubtitle1={data.resultSubtitle1}
          resultSubtitle2={data.resultSubtitle2}
          resultLow={data.resultLow}
          resultMedium={data.resultMedium}
          resultHigh={data.resultHigh}
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
        />
      </span>
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

    return (
      <Container className="ImageDetailView">
        <Close
          onClick={e => {
            this.endCallback(e);
          }}
        />
        <Main>{content}</Main>
        <GamePopup
          hideToast={this.state.hideToast}
          toastLeft={this.state.toastLeft}
          visible={this.state.toast}
          text={this.state.popupText}
          image={this.state.toastImage}
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

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100% !important;
  width: 100% !important;
  background-color: ${colors.shade};
  z-index: 11;
`;
const Main = styled.div`
  position: absolute;
  top: 0;
  left: 33%;
  height: 100% !important;
  width: 34% !important;
  background-color: ${colors.white};
`;
