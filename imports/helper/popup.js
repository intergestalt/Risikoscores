import { localeStr } from './global';
import { Session } from 'meteor/session';
import { exists, zuffi } from './global';
import { getCachedPopups, cachePopups, getPopupsIndex } from './actions';
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

export function loadPopups() {
  const sub = Meteor.subscribe('popups.list', () => {
    var popups = Popups.find({}).fetch();
    cachePopups(popups);
  });
}
