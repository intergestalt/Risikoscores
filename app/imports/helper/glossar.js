import { localeStr } from './global';
import { Session } from 'meteor/session';

export function cleanForSave(entry) {
  const result = entry;
  return result;
}
function compareGlossar(g1, g2) {
  const n1 = localeStr(g1.name);
  const n2 = localeStr(g2.name);
  if (n1 > n2) {
    return 1;
  }
  if (n1 < n2) {
    return -1;
  }
  return 0;
}
export function sortGlossar(glossar) {
  return glossar.sort(compareGlossar);
}

export function getRoomGlossar(glossar, roomGlossar) {
  result = [];
  for (var i = 0; i < glossar.length; i++) {
    const entry = glossar[i];
    const key = entry._id;
    if (roomGlossar[key]) {
      result.push(entry);
    }
  }
  return result;
}
export function getGlossarEntry(glossar, glossarDetailId) {
  for (var i = 0; i < glossar.length; i++) {
    const entry = glossar[i];
    const key = entry._id;
    if (key === glossarDetailId) {
      return entry;
    }
  }
  return null;
}
