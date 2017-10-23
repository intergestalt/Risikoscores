import { Session } from 'meteor/session';
import { exists, zuffi } from './global';

export function toggleLanguage() {
  var language = Session.get('language');
  if (language === 'en') {
    Session.set('language', 'de');
  } else {
    Session.set('language', 'en');
  }
}

export function toggleGraph() {
  var graphExpanded = isGraphExpanded();
  Session.set('graphExpanded', !graphExpanded);
}

export function toggleQuestions() {
  var questionsExpanded = isQuestionsExpanded();
  Session.set('questionsExpanded', !questionsExpanded);
}

export function toggleStartWelcome() {
  var expanded = isStartWelcomeExpanded();
  Session.set('startWelcomeExpanded', !expanded);
}

export function closeGlossarDetail() {
  Session.set('glossarDetailId', null);
}

export function showGlossarDetail(id) {
  Session.set('glossarDetailId', id);
}

export function setPreSelectedTabId(id) {
  Session.set('preSelectedTabId', id);
}

export function setSelectedTabId(id) {
  Session.set('selectedTabId', id);
}
export function setSelectedRoomId(id) {
  Session.set('selectedRoomId', id);
}

export function cacheRoomQuestions(questions, roomId) {
  Session.set('cachedRoomQuestions', { questions: questions, roomId: roomId });
}
export function cacheStreamQuestions(questions) {
  Session.set('cachedStreamQuestions', questions);
}

export function setStreamIndex(index) {
  Session.set('streamIndex', index);
}

export function incStreamIndex() {
  var index = Session.get('streamIndex');
  index++;
  var questions = getCachedStreamQuestions();
  if (exists(questions)) {
    if (index > questions.length) {
      index = questions.length;
      setStreamFinished();
    }
  }
  Session.set('streamIndex', index);
}

export function setStreamStarted() {
  const value = Session.set('streamStarted', true);
}

export function setStreamFinished() {}

export function setRealGraph(realGraph) {
  const value = Session.set('realGraph', realGraph);
}

// get

export function getGlossarDetailId() {
  const value = Session.get('glossarDetailId');
  return value;
}

export function isQuestionsExpanded() {
  const value = Session.get('questionsExpanded');
  return value;
}
export function isStartWelcomeExpanded() {
  const value = Session.get('startWelcomeExpanded');
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

export function getCachedRoomQuestions() {
  const questions = Session.get('cachedRoomQuestions');
  return questions;
}
export function getStreamIndex() {
  const value = Session.get('streamIndex');
  return value;
}
export function getCachedStreamQuestions() {
  const questions = Session.get('cachedStreamQuestions');
  return questions;
}

export function isStreamStarted() {
  const value = Session.get('streamStarted');
  return value;
}

export function isStreamFinished() {
  const value = Session.get('streamFinished');
  return value;
}

export function getRealGraph() {
  const value = Session.get('realGraph');
  return value;
}
