import { Session } from 'meteor/session';
import { exists, zuffi, shuffleArray } from './global';

export function toggleLanguage() {
  var language = Session.get('language');
  if (language === 'en') {
    Session.set('language', 'de');
  } else {
    Session.set('language', 'en');
  }
}
export function setLanguage(lang) {
  Session.set('language', lang);
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

export function setSelectedTabColor(id) {
  Session.set('selectedTabColor', id);
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

export function cachePopups(popups) {
  Session.set('cachedPopups', shuffleArray(popups));
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

export function setPopupsIndex(index) {
  Session.set('popupsIndex', index);
}

export function incPopupsIndex() {
  var index = Session.get('popupsIndex');
  index++;
  var popups = getCachedPopups();
  if (index >= popups.length) {
    index = 0;
  }
  Session.set('popupsIndex', index);
}

export function setStreamStarted() {
  Session.set('streamStarted', true);
}

export function setPopupsFinished() {}

export function setPopupsStarted() {
  Session.set('popupsStarted', true);
}

export function setStreamFinished() {}
export function setRealGraph(realGraph) {
  Session.set('realGraph', realGraph);
}

export function setSelectGraphNode(roomId) {
  Session.set('graphNodeId', roomId);
}

export function setTabSlider(tabSlider) {
  Session.set('tabSlider', tabSlider);
}
export function setTabDetail(yes, index) {
  Session.set('tabDetail', { show: yes, index: index });
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
  return value;
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
export function getPopupsIndex() {
  const value = Session.get('popupsIndex');
  return value;
}
export function getPopupActive() {
  const value = Session.get('popupActive');
  return value;
}
export function getPopupClosing() {
  const value = Session.get('popupClosing');
  return value;
}
export function getPopupRoom() {
  const value = Session.get('popupRoom');
  return value;
}
export function setPopupActive(active) {
  if (!active) {
    setPopupClosing(false);
  }
  Session.set('popupActive', active);
  Session.set('popupRoom', getSelectedRoomId());
}

export function setPlayAudio(value) {
  Session.set('playAudio', value);
}
export function setPlayAudioAll(value) {
  Session.set('playAudioAll', value);
}
export function getPlayAudioAll() {
  return Session.get('playAudioAll');
}
export function setPlayAudioFirst(value) {
  Session.set('playAudioFirst', value);
}
export function getPlayAudioFirst() {
  return Session.get('playAudioFirst');
}

export function setPlayAudioFile(name) {
  Session.set('playAudioFile', name);
}
export function setPopupClosing(closing) {
  Session.set('popupClosing', closing);
}

export function getCachedStreamQuestions() {
  const questions = Session.get('cachedStreamQuestions');
  return questions;
}
export function getCachedQuestions() {
  const questions = Session.get('cachedQuestions');
  return questions;
}
export function setCachedQuestions(value) {
  const questions = Session.set('cachedQuestions', value);
}

export function getCachedPopups() {
  const questions = Session.get('cachedPopups');
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

export function isPopupsStarted() {
  const value = Session.get('popupsStarted');
  return value;
}

export function isPopupsFinished() {
  const value = Session.get('popupsFinished');
  return value;
}

export function getRealGraph() {
  const value = Session.get('realGraph');
  return value;
}

export function getSelectGraphNode() {
  const value = Session.get('graphNodeId');
  return value;
}

export function getLanguage() {
  return Session.get('language');
}

export function getPlayAudio() {
  return Session.get('playAudio');
}
export function getPlayAudioFile() {
  if (Session.get('playAudioFirst')) {
    return 'silence.mp3';
  }
  return Session.get('playAudioFile');
}
export function isTabDetail() {
  var detail = Session.get('tabDetail');
  if (exists(detail)) {
    if (exists(detail.index)) {
      if (detail.index !== -1) {
        if (exists(detail.show)) {
          return detail.show;
        }
      }
    }
  }
  setTabDetail(false, null);
  return false;
}

export function getTabDetailIndex() {
  var detail = Session.get('tabDetail');
  if (exists(detail)) {
    if (exists(detail.index)) {
      return detail.index;
    }
  }
  return -1;
}

export function setTabDetailIndex(i) {
  var detail = Session.get('tabDetail');
  if (exists(detail)) {
    if (exists(detail.index)) {
      detail.index = i;
    }
  } else {
    detail = { index: i };
  }
  Session.set('tabDetail', detail);
}

export function getTabSlider(room, tab) {
  var slider = Session.get('tabSlider');
  if (!exists(room) && !exists(tab)) {
    return slider;
  }
  if (exists(slider)) {
    if (slider.room === room && slider.tab === tab) {
      if (exists(slider.list)) {
        return slider;
      }
    }
  }
  return null;
}

export function getBeamOut() {
  const value = Session.get('beamOut');
  return value;
}

export function setBeamOut(value) {
  Session.set('beamOut', value);
}

export function getGameStarted() {
  const value = Session.get('gameStarted');
  return value;
}

export function setGameStarted(value) {
  Session.set('gameStarted', value);
}
export function getGameConfig() {
  const value = Session.get('gameConfig');
  return value;
}

export function setGameConfig(value) {
  Session.set('gameConfig', value);
}
