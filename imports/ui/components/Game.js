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
      popupText: ''
    };
    this.timer1 = null;
    this.timer2 = null;
    this.endCallback = this.endCallback.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.select = this.select.bind(this);
    this.toast = this.toast.bind(this);
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
      popupText: ''
    });
    setGameStarted(false);
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
      popupText: text + ' ' + sel
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

  prev() {
    var newPage = this.state.page - 1;
    this.setState({ page: newPage });
    this.hideToast();
  }

  next() {
    var newPage = this.state.page + 1;
    this.setState({ page: newPage });
    this.hideToast();
  }

  getResultPercent() {
    return '44 %';
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
    var resultPercent = this.getResultPercent();
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
          page={page}
          resultText={data.resultText}
          resultPercent={resultPercent}
        />
      </span>
    );
  }
  getQuestion(page) {
    var resultPercent = this.getResultPercent();
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
          number={data.questions.length}
          prevText={data.prevText}
          nextText={data.nextText}
        />
        <GameBottom
          page={page}
          resultText={data.resultText}
          resultPercent={resultPercent}
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
