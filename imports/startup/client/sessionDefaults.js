import { Session } from 'meteor/session';

Session.setDefault('language', 'de');
Session.setDefault('graphExpanded', true);
Session.setDefault('questionsExpanded', false);
Session.setDefault('glossarDetailId', null);
Session.setDefault('selectedRoomId', null);
Session.setDefault('selectedRoomIdChanged', false);
Session.setDefault('selectedTabId', null);
