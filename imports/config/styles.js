const colors = {
  paleblue: 'rgb(0,175,240)',
  blue: 'rgb(0,0,255)',
  turqoise: 'rgb(0,255,190)',
  violet: 'rgb(150,0,255)',
  red: 'rgb(255,0,0)',
  mediumblue: 'rgb(0,100,255)',
  yellow: 'rgb(255,255,0)',
  green: 'rgb(40,255,0)',
  magenta: 'rgb(255,0,255)',
  orange: 'rgb(255,115,0)',
  cyan: 'rgb(0,255,255)',
  verylightgrey: 'rgb(229,229,229)',
  lightgrey: 'rgb(204,204,204)',
  littlelightgrey: 'rgb(166,166,166)',
  mediumgrey: 'rgb(128,128,128)',
  darkgrey: 'rgb(89,89,89)',
  verydarkgrey: 'rgb(50,50,50)',
  shade: 'rgba(0,0,0,0.9)',
  white: 'rgb(255,255,255)'
};

colors.named = {
  button1: colors.orange,
  button2: colors.cyan,
  room: colors.blue,
  glossar: colors.red
};

const snippets = {
  headlineText: `
    font-family: 'Roboto Medium';
    line-height: 21px;
    font-size: 18px;
  `,
  bodyText: `
    font-family: 'Roboto Light';
    line-height: 21px;
    font-size: 18px;
  `,
  smallText: `
    font-family: 'Roboto Regular';
    line-height: 21px;
    font-size: 10px;
  `,
  annotationText: `
    font-family: 'Roboto Regular';
    line-height: 16px;
    font-size: 13px;
  `,
  tabText: `
    font-family: 'Roboto Light';
    font-size: 13px;
  `,
  glossarText: `
  font-family: 'Roboto Light';
  line-height: 21px;
  font-size: 18px;
`
};

const dist = {
  tiny: '10px', // #0ff
  small: '21px', // #f0f
  medium: '30px', // #0f0
  large: '40px', // #00f
  homescreen: '12px', // #ff0
  lineTopDiff: '0.3em', // distance between upper border of line and capital letter
  lineBottomDiff: '0.3em' // distance between lower border of line and capital letter
};

dist.named = {
  columnPadding: dist.small
};

export { colors, snippets, dist };

/**************************************************************
  
  This is a sketch illustrating lineTopDiff and lineBottomDiff
  all according to standard line height and the custom font
  
  | upper border of line -------------------------------------
  |   lineTopDiff -> 
  | character            ABCDEFGHIJKLMNOPQRSTUVWXYZ
  |   lineBottomDiff ->
  | lower border of line -------------------------------------
  
***************************************************************/
