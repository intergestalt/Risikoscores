import {
  incStreamIndex,
  setStreamStarted,
  isStreamStarted,
  isStreamFinished,
  getStreamIndex
} from './actions';
import { zuffi } from './global';

const streamZuffiDelay = [1, 4, 4, 4, 4, 8, 8, 8, 8, 16, 32, 64, 128];

export function getStartStreamDelay() {
  var index = getStreamIndex();

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
    streamTimeout();
    incStreamIndex();
  }, delay);
}

export function startStreamTimeout() {
  if (!isStreamStarted()) {
    streamTimeout();
    setStreamStarted();
  }
}
