import { localeStr } from './global';
import { Session } from 'meteor/session';
import { exists, zuffi } from './global';
import { getCachedPopups, cachePopups, getPopupsIndex } from './actions';
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
