/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import SimpleSchema from 'meteor/aldeed:simple-schema';

import Rooms from '../../collections/rooms';
import RoomSchema from '../../schemas/room';
import Glossar from '../../collections/glossar';
import GlossarSchema from '../../schemas/glossar';
import PopupSchema from '../../schemas/popup';
import TextFragments from '../../collections/textFragments';
import TextFragmentSchema from '../../schemas/textFragment';
import Questions from '../../collections/questions';
import QuestionSchema from '../../schemas/question';
import Graph from '../../collections/graph';
import GraphNodeSchema from '../../schemas/graph';
import { getId } from '../../helper/admin';
import { getInitialQuestions } from './initialQuestions';
import { getInitialGlossar } from './initialGlossar';
import { getGraph } from './graph';

const questions = getInitialQuestions();
const graphNodes = getGraph();

const rooms = [
  'arriba',
  'framingham',
  'einwohnermeldeamt',
  'bioprobenlager',
  'programmierbuero',
  'www',
  'teilnehmermanagement',
  'untersuchungszentrum',
  'serverraum',
  'arztpraxis'
];

const textFragments = [
  'glossar',
  'closeGlossar',
  'graphTitle',
  'roomQuestionsTitle',
  'roomInterTitle',
  'startTitle',
  'startInfo',
  'menuIcon',
  'aboutLink',
  'aboutText',
  'languageLink'
];

const glossar = getInitialGlossar();

Meteor.startup(() => {
  console.log('running fixures');

  if (Meteor.users.find({ username: 'admin' }).count() == 0) {
    console.log('seeding admin user');
    Accounts.createUser({
      username: 'admin',
      password: 'password'
    });
  }

  if (Meteor.users.find({ username: 'editor' }).count() == 0) {
    console.log('seeding editor user');
    Accounts.createUser({
      username: 'editor',
      password: 'password'
    });
  }

  //Rooms.remove({});
  rooms.forEach(room => {
    if (!Rooms.findOne({ key: room })) {
      console.log('inserting room ' + room);
      const name = room[0].toUpperCase() + room.substring(1);
      Rooms.insert({
        ...RoomSchema.clean({}),
        key: room,
        name: { en: name, de: name }
      });
    }
  });
  textFragments.forEach(tf => {
    if (!TextFragments.findOne(tf)) {
      console.log('inserting text fragment ' + tf);
      TextFragments.insert({
        ...TextFragmentSchema.clean({}),
        _id: tf,
        text: { en: tf, de: tf }
      });
    }
  });
  //Glossar.remove({});
  /* glossar.forEach(entry => {
    const name = entry.name;
    const id = entry.id;
    if (!Glossar.findOne(id)) {
      console.log('inserting glossar entry ' + id);
      console.log(name + ' -> ' + id);
      Glossar.insert({
        ...GlossarSchema.clean({}),
        _id: id,
        name: { de: name },
        text: { de: entry.text }
      });
    }
  });*/

  /*Questions.remove({});
  questions.forEach(question => {
    console.log('inserting question ' + question.text);
    Questions.insert({
      ...QuestionSchema.clean({}),
      text: { de: question.text },
      image: question.image,
      roomId: question.roomId,
      originRoomId: question.originRoomId
    });
  });*/

  //Graph.remove({});
  graphNodes.forEach(graphNode => {
    if (!Graph.findOne(graphNode._id)) {
      console.log('inserting graphNode ' + graphNode._id);
      Graph.insert({
        ...GraphNodeSchema.clean({}),
        _id: graphNode._id,
        pseudo: graphNode.pseudo,
        x: graphNode.x,
        y: graphNode.y,
        neighbours: graphNode.neighbours
      });
    }
  });
});
