import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../config/styles';

class GameBottom extends React.Component {
  getStr(num) {
    const sel = this.props.selected;
    if (num == 0) {
      if (sel == 0) {
        return this.props.resultLow.sigi;
      } else if (sel == 1) {
        return this.props.resultLow.riri;
      } else if (sel == 2) {
        return this.props.resultLow.per;
      }
    } else if (num == 1) {
      if (sel == 0) {
        return this.props.resultMedium.sigi;
      } else if (sel == 1) {
        return this.props.resultMedium.riri;
      } else if (sel == 2) {
        return this.props.resultMedium.per;
      }
    } else if (num == 2) {
      if (sel == 0) {
        return this.props.resultHigh.sigi;
      } else if (sel == 1) {
        return this.props.resultHigh.riri;
      } else if (sel == 2) {
        return this.props.resultHigh.per;
      }
    }
  }

  getMatch(num) {
    const sel = this.props.selected;
    if (num == 0 && sel == 0) {
      return true;
    }
    if (num == 1 && sel == 1) {
      return true;
    }
    if (num == 2 && sel == 2) {
      return true;
    }
    return false;
  }

  render() {
    const page = this.props.page;
    if (page == 0) {
      return (
        <Bottom onClick={this.props.clickCallback}>{this.props.los}</Bottom>
      );
    } else if (page == 1) {
      return (
        <Bottom onClick={this.props.clickCallback}>
          <ResultSatz>{this.props.resultText}</ResultSatz>
        </Bottom>
      );
    } else if (page == this.props.number + 2) {
      if (!this.props.allAnswered) {
        return <Bottom />;
      }
      const p = this.props.resultPercent;
      var doc = '';
      var m = false;
      if (p <= 25) {
        doc = this.getStr(0);
        m = this.getMatch(0);
      } else if (p > 25 && p <= 75) {
        doc = this.getStr(1);
        m = this.getMatch(1);
      } else {
        doc = this.getStr(2);
        m = this.getMatch(2);
      }
      var sub3 = this.props.noMatch;
      if (m) {
        sub3 = this.props.match;
      }
      sub3 = sub3.replace(/_name_/g, this.props.name);
      if (!this.props.resultClicked) {
        sub3 = '';
      }
      const cDoc = doc;
      const sub1 = this.props.resultSubtitle1;
      const sub2 = this.props.resultSubtitle2;

      return (
        <Bottom
          onClick={() => {
            this.props.toast(cDoc);
            this.props.resultClickedCallBack();
          }}
        >
          <div>{sub1}</div>
          <div>{sub2}</div>
          <div>
            <br />
            <br />
            {sub3}
          </div>
        </Bottom>
      );
    } else {
      return (
        <Bottom>
          <ResultSatz>{this.props.resultText}</ResultSatz>
          <ResultPercent>{this.props.resultPercent}</ResultPercent>
        </Bottom>
      );
    }
  }
}

export default GameBottom;

const Bottom = styled.div`
  position: absolute;
  line-height: 1.1em;
  background-color: ${colors.turqoise};
  height: 38%;
  bottom: 0;
  width: 100%;
  font-family: 'Roboto Light';
`;
const ResultSatz = styled.div`
  line-height: 1.1em;
  height: 50%;
  width: 100%;
  font-family: 'Roboto Light';
`;
const ResultPercent = styled.div`
  line-height: 1.1em;
  height: 50%;
  width: 100%;
  font-family: 'Roboto Light';
`;
