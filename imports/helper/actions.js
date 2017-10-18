import { Session } from 'meteor/session';
import { exists } from './global';

function prevent(e) {
  if (exists(e)) {
    e.preventDefault();
  }
}
export function toggleGraph(e) {
  prevent(e);
  var graphExpanded = isGraphExpanded();
  Session.set('graphExpanded', !graphExpanded);
}

export function toggleQuestions(e) {
  prevent(e);
  var questionsExpanded = isQuestionsExpanded();
  Session.set('questionsExpanded', !questionsExpanded);
}

export function closeGlossarDetail(e) {
  prevent(e);
  Session.set('glossarDetailId', null);
}

export function showGlossarDetail(e, id) {
  prevent(e);
  Session.set('glossarDetailId', id);
}

export function setPreSelectedTabId(e, id) {
  prevent(e);
  Session.set('preSelectedTabId', id);
}

export function setSelectedTabId(e, id) {
  prevent(e);
  Session.set('selectedTabId', id);
}
export function setSelectedRoomId(e, id) {
  prevent(e);
  Session.set('selectedRoomId', id);
}

export function cacheRoomQuestions(e, questions, roomId) {
  prevent(e);
  Session.set('cachedRoomQuestions', { questions: questions, roomId: roomId });
}

// get

export function getGlossarDetailId(e) {
  const value = Session.get('glossarDetailId');
  return value;
}

export function isQuestionsExpanded() {
  const value = Session.get('questionsExpanded');
  return value;
}

export function isGraphExpanded() {
  const value = Session.get('graphExpanded');
  return value;
}

export function getPreSelectedTabId() {
  const value = Session.get('preSelectedTabId');
}

export function getSelectedRoomId() {
  const value = Session.get('selectedRoomId');
  return value;
}

export function getSelectedTabId() {
  const value = Session.get('selectedTabId');
  return value;
}

export function getCachedRoomQuestions(e) {
  const questions = Session.get('cachedRoomQuestions');
  return questions;
}
