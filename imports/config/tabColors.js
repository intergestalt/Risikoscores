import color from 'color';
import { colors } from './styles';

const maxDarken = 0.6;

const tabColors = (tabColor, steps) => {
  let out = []
  for (let i = 1; i < steps + 1; i++) {
    const darken = (i * ((1 - maxDarken) / steps));
    const c = color(tabColor).darken(darken).string();
    out.push(c)
  }
  return out;
}

// choose the alternating colors of the rooms
const tabColorPalette = [
  // colors.magenta,
  colors.turqoise,
  // colors.orange
]

// choose the corresponding text colors of the rooms
const tabLinkColorPalette = [
  // colors.magenta,
  color(colors.turqoise).darken(0.4).string(),
  // colors.orange
]

export { tabColors, tabColorPalette, tabLinkColorPalette }