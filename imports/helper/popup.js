import { localeStr } from './global';
import { Session } from 'meteor/session';

export function cleanForSave(entry) {
  const result = entry;
  return result;
}
function comparePopups(p1, p2) {
  const n1 = localeStr(p1.name);
  const n2 = localeStr(p2.name);
  if (n1 > n2) {
    return 1;
  }
  if (n1 < n2) {
    return -1;
  }
  return 0;
}
export function sortPopups(popups) {
  return popups.sort(comparePopups);
}
