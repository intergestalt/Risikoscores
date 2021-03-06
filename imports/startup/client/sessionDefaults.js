import { Session } from 'meteor/session';

Session.setDefault('language', 'de');
Session.setDefault('graphExpanded', true);
Session.setDefault('questionsExpanded', false);
Session.setDefault('glossarDetailId', null);
Session.setDefault('selectedRoomId', null);
Session.setDefault('selectedTabId', null);
Session.setDefault('cachedRoomQuestions', null);
Session.setDefault('cachedStreamQuestions', null);
Session.setDefault('streamIndex', 0);
Session.setDefault('popupsIndex', 0);
Session.setDefault('popupActive', false);
Session.setDefault('popupClosing', false);
Session.setDefault('startWelcomeExpanded', true); // deprecated
Session.setDefault('startWelcomeState', 0); // 0: Erster Absatz, 1: Alles, 2: Nur Überschrift, 3: Alles
Session.setDefault('streamStarted', false);
Session.setDefault('streamFinished', false);
Session.setDefault('realGraph', null);
Session.setDefault('graphNodeId', null);
Session.setDefault('showAbout', false);
Session.setDefault('powerOn', true);
Session.setDefault('powerWasOff', false);
Session.setDefault('serverMute', false);
Session.setDefault('roomVariant', 'live');
Session.setDefault('roomVisitCounter', -1);
Session.setDefault('playAudio', false);
Session.setDefault('playAudioFirst', true);
Session.setDefault('playAudioFile', '');
Session.setDefault('beamOut', false);
Session.setDefault('gameStarted', false);
Session.setDefault('imageLayout', false); // give a clue whether image widths are "half" of the screen or "third"