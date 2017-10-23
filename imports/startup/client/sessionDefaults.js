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
Session.setDefault('startWelcomeExpanded', true);
Session.setDefault('streamStarted', false);
Session.setDefault('streamFinished', false);
Session.setDefault('realGraph', null);
