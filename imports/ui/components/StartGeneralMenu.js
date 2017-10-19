import React, { Component } from 'react';

import { getFragment } from '../../helper/fragment';
import { toggleLanguage } from '../../helper/actions';

class StartGeneralMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  callbackLanguage(e) {
    e.preventDefault();
    toggleLanguage();
  }
  callbackAbout(e) {
    e.preventDefault();
    console.log('ABOUT');
  }

  render() {
    var language = getFragment('languageLink');
    var about = getFragment('aboutLink');

    return (
      <div className="StartRoomMenuArea">
        <a
          href="#"
          onClick={e => {
            this.callbackLanguage(e);
          }}
        >
          {language}
        </a>
        <br />
        <a
          href="#"
          onClick={e => {
            this.callbackAbout(e);
          }}
        >
          {about}
        </a>
      </div>
    );
  }
}

export default StartGeneralMenu;
