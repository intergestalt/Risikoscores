import { getLanguage } from './actions';

export function exists(v) {
  if (v === null) return false;
  if (v === undefined) return false;
  return true;
}

export function existsNumber(v) {
  if (!exists(v)) return false;
  if (!Number.isInteger(v)) return false;
  return true;
}

export function existsString(v) {
  if (!exists(v)) return false;
  if (v.trim() === '') return false;
  return true;
}
function sortIndexArray(g1, g2) {
  const n1 = g1.zuffi;
  const n2 = g2.zuffi;
  if (n1 > n2) {
    return 1;
  }
  if (n1 < n2) {
    return -1;
  }
  return 0;
}
export function shuffleArray(arr) {
  var indexArr = [];
  for (var i = 0; i < arr.length; i++) {
    const entry = { index: i, zuffi: Math.round(Math.random() * 1000) };
    indexArr.push(entry);
  }
  indexArr.sort(sortIndexArray);
  var result = [];
  for (var i = 0; i < indexArr.length; i++) {
    index = indexArr[i].index;
    result.push(arr[index]);
  }
  return result;
}

export function localeStr(obj, lang = null) {
  if (!exists(obj)) return '';
  const fallBack = true;
  const defaultLanguage = 'de';
  var usedLang = getLanguage();
  if (exists(lang)) {
    usedLang = lang;
  }
  var result = obj[usedLang];
  if (existsString(result)) {
    return result.trim();
  } else {
    if (fallBack) {
      result = obj[defaultLanguage];
      if (existsString(result)) {
        return result.trim();
      }
    }
  }
  return '';
}

export function getUrl(str) {
  var result = str.replace(/\//g, '%2F');
  return result;
}

export function getUnUrl(str) {
  var result = str.replace(/\%2F/g, '/');
  return result;
}

export function zuffi(max) {
  var zuffi = Math.trunc(Math.random() * max);
  if (zuffi < 0) zuffi = 0;
  if (zuffi > max) index = max;
  return zuffi;
}

export function percentFromValue(value, unit) {
  var x = value / unit * 100;
  return x;
}

export function pointInRect(point, rect) {
  if (
    point.x > rect.left &&
    point.x < rect.right &&
    point.y > rect.top &&
    point.y < rect.bottom
  ) {
    return true;
  }
  return false;
}
