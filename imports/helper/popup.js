import { localeStr } from './global';
import { Session } from 'meteor/session';
import { exists, zuffi } from './global';
import {
  getCachedPopups,
  cachePopups,
  setPopupsStarted,
  isPopupsStarted,
  isPopupsFinished,
  getPopupsIndex,
  getPopupActive,
  setPopupActive,
  incPopupsIndex,
  setPopupClosing
} from './actions';
import Popups from '../collections/popups';
import { keyframes } from 'styled-components';

export function cleanForSave(entry) {
  const result = entry;
  return result;
}
export function getPopup(index) {
  if (!exists(index)) {
    index = getPopupsIndex();
  }
  var last = getCachedPopups();
  if (exists(last)) {
    if (index > last.length) {
      index = last.length;
    }
    return last[index];
  }
  return null;
}
const popupZuffiDelay = [20, 120];

export function getStartPopupsDelay() {
  var index = getPopupsIndex();
  if (index >= popupZuffiDelay.length) {
    index = popupZuffiDelay.length - 1;
  }
  const zuffiDelay = popupZuffiDelay[index] * 1000;
  const zuffiOffset = Math.trunc(zuffiDelay / 2);
  const delay = zuffi(zuffiDelay) + zuffiOffset;
  return delay;
}

function popupsTimeout() {
  if (isPopupsFinished()) {
    return;
  }
  const delay = getStartPopupsDelay();
  setTimeout(() => {
    if (!getPopupActive()) {
      setPopupActive(true);
      incPopupsIndex();
    }
    popupsTimeout();
  }, delay);
}
export function closePopup() {
  setPopupClosing(true);
  setTimeout(() => {
    setPopupActive(false);
  }, 200);
}

export function startPopupsTimeout() {
  if (!isPopupsStarted()) {
    loadPopups();
    popupsTimeout();
    setPopupsStarted();
  }
}

export function loadPopups() {
  const sub = Meteor.subscribe('popups.list', () => {
    var popups = Popups.find({}).fetch();
    cachePopups(popups);
  });
}

export function getBottomAnimations(height) {
  var h = '-100%';
  if (exists(height)) {
    h = '-' + height + 'px';
  }
  const moveIn = keyframes`
                            0% {
                              bottom:${h};
                            }
                            100% {
                              bottom:0%;
                            }
                            `;

  const moveOut = keyframes`
                            0% {
                              bottom:0%;
                            }
                            100% {
                              bottom:${h};
                            }
                            `;
  return { moveIn, moveOut };
}

export function getTopRightAnimations(width, height) {
  var w = '-100%';
  var h = '-100%';
  if (exists(height)) {
    h = '-' + height + 'px';
  }
  if (exists(width)) {
    w = '-' + width + 'px';
  }
  const moveIn = keyframes`
                    0% {
                      top:${h};
                      right:${w};
                    }
                    100% {
                      top:0%;
                      right:0%;
                    }
                    `;

  const moveOut = keyframes`
                    0% {
                      top:0%;
                      right:0%;
                    }
                    100% {
                      top:${h};
                      right:${w};
                    }
                    `;
  return { moveIn, moveOut };
}
