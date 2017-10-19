import { Session } from 'meteor/session';
import {
  incStreamIndex,
  setStreamStarted,
  isStreamStarted,
  isStreamFinished
} from './actions';

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

export function localeStr(obj) {
  if (!exists(obj)) return '';
  const fallBack = true;
  const defaultLanguage = 'de';

  var lang = Session.get('language');
  var result = obj[lang];
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

export function zuffi(max) {
  var zuffi = Math.trunc(Math.random() * max);
  if (zuffi < 0) zuffi = 0;
  if (zuffi > max) index = max;
  return zuffi;
}

const streamZuffiDelay = [1, 4, 4, 4, 10, 20, 30, 40, 50, 60];

export function getStartStreamDelay() {
  var index = Session.get('streamIndex');

  if (index >= streamZuffiDelay.length) {
    index = streamZuffiDelay.length - 1;
  }
  const zuffiDelay = streamZuffiDelay[index] * 1000;
  const zuffiOffset = Math.trunc(zuffiDelay / 2);
  const delay = zuffi(zuffiDelay) + zuffiOffset;
  return delay;
}

function streamTimeout() {
  if (isStreamFinished()) {
    return;
  }
  const delay = getStartStreamDelay();
  setTimeout(() => {
    incStreamIndex(null);
    streamTimeout();
  }, delay);
}

export function startStreamTimeout() {
  if (!isStreamStarted()) {
    streamTimeout();
    setStreamStarted(null);
  }
}
