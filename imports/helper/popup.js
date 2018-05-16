import { keyframes } from 'styled-components';

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
const popupZuffiDelay = [20, 120, 120];

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

export function getBottomAnimations() {
  const moveIn = keyframes`
                            0% {
                              transform: translateY(100%);
                            }
                            100% {
                              transform: translateY(0%);
                            }
                            `;

  const moveOut = keyframes`
                            0% {
                              transform: translateY(0%);
                            }
                            100% {
                              transform: translateY(100%);
                            }
                            `;
  return { moveIn, moveOut };
}
export function getLeftAnimations() {
  const moveIn = keyframes`
                            0% {
                              transform: translateX(-100%);
                            }
                            100% {
                              transform: translateX(0%);
                            }
                            `;

  const moveOut = keyframes`
                            0% {
                              transform: translateX(0%);
                            }
                            100% {
                              transform: translateX(-100%);
                            }
                            `;
  return { moveIn, moveOut };
}
export function getRightAnimations() {
  const moveIn = keyframes`
                            0% {
                              transform: translateX(100%);
                            }
                            100% {
                              transform: translateX(0%);
                            }
                            `;

  const moveOut = keyframes`
                            0% {
                              transform: translateX(0%);
                            }
                            100% {
                              transform: translateX(100%);
                            }
                            `;
  return { moveIn, moveOut };
}
export function getTopRightAnimations() {
  const moveIn = keyframes`
                    0% {
                      transform: translateX(100%) translateY(-100%);
                    }
                    100% {
                      transform: translateX(0%) translateY(0%);
                    }
                    `;

  const moveOut = keyframes`
                    0% {
                      transform: translateX(0%) translateY(0%);
                    }
                    100% {
                      transform: translateX(100%) translateY(-100%);
                    }
                    `;
  return { moveIn, moveOut };
}
