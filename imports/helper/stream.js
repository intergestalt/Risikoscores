import {
  incStreamIndex,
  setStreamStarted,
  isStreamStarted,
  isStreamFinished,
  shiftStream,
  switchStreamShuffeled
} from './actions';
import { zuffi } from './global';
import { setLoading } from './question';

export function getStartStreamDelay() {
  const zuffiDelay = 4000;
  const zuffiOffset = Math.trunc(zuffiDelay / 2);
  const delay = zuffi(zuffiDelay) + zuffiOffset;
  return delay;
}

function streamTimeout() {
  const delay = getStartStreamDelay();
  setTimeout(() => {
    streamTimeout();
    if (isStreamFinished()) {
      switchStreamShuffeled();
      shiftStream();
    } else {
      incStreamIndex();
    }
    setLoading();
  }, delay);
}

export function startStreamTimeout() {
  if (!isStreamStarted()) {
    streamTimeout();
    setStreamStarted();
  }
}
