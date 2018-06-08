import React, { Component } from 'react';
import styled from 'styled-components';

import { colors, dist, snippets } from '../../config/styles';

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
    console.log(this.props)
    const page = this.props.page;
    if (page == 0) {
      return (
        <Bottom onClick={this.props.clickCallback}>
          <HugeText clickable uppercase>
            {this.props.los}
          </HugeText>
        </Bottom>
      );
    } else if (page == 1) {
      return (
        <Bottom onClick={this.props.clickCallback}>
          {this.props.selected < 0 ?
            <NormalText>
              {this.props.resultText}
            </NormalText>
            :
            <HugeText clickable>
              {this.props.resultText}
            </HugeText>
          }
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
        < Bottom
          onClick={() => {
            this.props.toast(cDoc);
            this.props.resultClickedCallBack();
          }
          }
        >
          <NormalText clickable={!this.props.resultClicked}>
            <p>{sub1}</p>
            <p>{sub2}</p>
            <p>{sub3}</p>
          </NormalText>
        </Bottom >
      );
    } else {
      return (
        <Bottom>
          <NormalText>{this.props.resultText}</NormalText>
          <HugeText>{this.props.resultPercent}</HugeText>
        </Bottom>
      );
    }
  }
}

export default GameBottom;

const Bottom = styled.div`
  background-color: ${colors.turqoise};
  height: 33.33%;
  display: flex;
  flex-direction: column;
  padding: ${dist.named.columnPadding};
  padding-top: calc(${dist.named.columnPadding} - ${dist.lineTopDiff});
  p + p {
    margin-top: 1em;
  } 
`;

const NormalText = styled.div`
  cursor: ${ props => props.clickable ? "pointer" : "auto"};
`

const HugeText = (props) => (<Huge {...props}><span>{props.children}</span></Huge>)
const Huge = styled.div`
  ${snippets.gameHuge};
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  cursor: ${ props => props.clickable ? "pointer" : "auto"};
  ${ props => props.uppercase ? "text-transform: uppercase" : null};
`

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
