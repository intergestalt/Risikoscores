import { keyframes } from 'styled-components';

import { localeStr } from './global';
import { Session } from 'meteor/session';
import { exists, existsString, zuffi } from './global';
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
  setPopupClosing,
  getSelectedRoomId
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
const popupZuffiDelay = [360, 360, 360, 360, 360, 360];

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
      incPopupsIndex();
      const popup = getPopup();
      const url = getPopupUrl(popup.targetRoomId);
      if (url.roomId != getSelectedRoomId()) {
        setPopupActive(true);
      }
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

export function getPopupUrl(url) {
  if (!exists(url)) return;
  var index = url.indexOf(';');
  var result = {};
  if (index == -1) {
    result.roomId = url.trim();
    result.tabId = '';
  } else {
    const substrings = url.split(';');
    result.roomId = substrings[0];
    if (substrings.length > 1) {
      var tabId = substrings[1];
      if (existsString(tabId)) {
        result.tabId = tabId.trim();
      }
    }
  }
  return result;
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
