import { Session } from 'meteor/session';

export function toggleGlossar(e) {
  e.preventDefault();
  var glossarExpanded = isGlossarExpanded();
  Session.set('glossarExpanded', !glossarExpanded);
}

export function closeGlossarDetail(e) {
  e.preventDefault();
  Session.set('glossarDetailId', null);
}

export function showGlossarDetail(e, id) {
  e.preventDefault();
  Session.set('glossarDetailId', id);
}

export function setPreselectedTabId(e, id) {
  e.preventDefault();
  Session.set('preselectedTabId', id);
}

// get

export function getGlossarDetailId(e) {
  const value = Session.get('glossarDetailId');
  return value;
}

export function isGlossarExpanded() {
  const value = Session.get('glossarExpanded');
  return value;
}

export function getPreselectedTabId() {
  const value = Session.get('preselectedTabId');
}
