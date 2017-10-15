/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import SimpleSchema from 'meteor/aldeed:simple-schema';

import Rooms from '../../collections/rooms';
import RoomSchema from '../../schemas/room';
import Glossar from '../../collections/glossar';
import GlossarSchema from '../../schemas/glossar';
import TextFragments from '../../collections/textFragments';
import TextFragmentSchema from '../../schemas/textFragment';
import { getId } from '../../helper/admin';

const rooms = ['framingham', 'einwohnermeldeamt'];
const textFragments = ['glossar', 'closeGlossar'];
const glossar = [
  'Kohortenstudie',
  'Quantitativ',
  'Risikofaktoren-Epidemiologie',
  'Mediterrane Diät',
  'Risikofaktor',
  'Molekularbiologie',
  'Genomforschung',
  'Biobank',
  'Informierte Zustimmung (informed consent)',
  'Assoziationsstudien',
  'Biomarker'
];

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

  rooms.forEach(room => {
    if (!Rooms.findOne(room)) {
      console.log('inserting room ' + room);
      const name = room[0].toUpperCase() + room.substring(1);
      Rooms.insert({
        ...RoomSchema.clean({}),
        _id: room,
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
  //  Glossar.remove({});
  glossar.forEach(entry => {
    const name = entry;
    const id = getId(name);
    if (!Glossar.findOne(id)) {
      console.log('inserting glossar entry ' + id);
      console.log(name + ' -> ' + id);
      Glossar.insert({
        ...GlossarSchema.clean({}),
        _id: id,
        name: { de: name }
      });
    }
  });
});
