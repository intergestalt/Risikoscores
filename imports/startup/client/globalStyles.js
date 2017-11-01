import { injectGlobal } from 'styled-components';
import { snippets, colors } from './../../config/styles';

import reset from 'reset.css'; // reset style sheet

injectGlobal`

  @font-face { 
    font-family: 'Roboto Medium';
    src: url('/assets/fonts/Roboto-Medium.woff2') format('woff2'),
        url('/assets/fonts/Roboto-Medium.ttf') format('ttf'); 
  }

  @font-face { 
    font-family: 'Roboto Light';
    src: url('/assets/fonts/Roboto-Light.woff2') format('woff2'),
        url('/assets/fonts/Roboto-Light.ttf') format('ttf'); 
  }

  @font-face { 
    font-family: 'Roboto Regular';
    src: url('/assets/fonts/Roboto-Regular.woff2') format('woff2'),
        url('/assets/fonts/Roboto-Regular.ttf') format('ttf'); 
  }

  body {
    margin: 0;
    ${snippets.bodyText};
    background-color:${colors.mediumgrey};
  }

  html, body, #render-target, .App {
    height: 100%;
  }

  html.noscroll {
    overflow: hidden;
  }

  a {
    text-decoration: none;
    color: ${colors.blue};
    &.SCGlossarLink {
      color ${colors.named.glossar};
    }
    &:hover {
      text-decoration: underline;
    }
  }

`;
