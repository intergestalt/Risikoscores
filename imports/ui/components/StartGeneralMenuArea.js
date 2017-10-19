import React, { Component } from 'react';

import { StartGeneralMenu } from './';

class StartGeneralMenuArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="StartGeneralMenuArea">
        <StartGeneralMenu />
      </div>
    );
  }
}

export default StartGeneralMenuArea;
