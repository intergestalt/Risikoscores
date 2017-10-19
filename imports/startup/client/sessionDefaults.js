import { Session } from 'meteor/session';

Session.setDefault('language', 'de');
Session.setDefault('graphExpanded', true);
Session.setDefault('questionsExpanded', false);
Session.setDefault('glossarDetailId', null);
Session.setDefault('selectedRoomId', null);
Session.setDefault('selectedTabId', null);
Session.setDefault('cachedRoomQuestions', null);
Session.setDefault('cachedStreamQuestions', null);
Session.setDefault('streamIndex', 4);
Session.setDefault('startWelcomeExpanded', true);
