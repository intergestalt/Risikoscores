/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import SimpleSchema from 'meteor/aldeed:simple-schema';

import Rooms from '../../collections/rooms';
import RoomSchema from '../../schemas/room';

const rooms = ['framingham','einwohnermeldeamt'];

Meteor.startup(() => {
  console.log('running fixures');

  if (Meteor.users.find({ username: 'admin' }).count() == 0) {
    console.log('seeding admin user');
    Accounts.createUser({
      username: 'admin',
      password: 'password',
    });
  }

  if (Meteor.users.find({ username: 'editor' }).count() == 0) {
    console.log('seeding editor user');
    Accounts.createUser({
      username: 'editor',
      password: 'password',
    });
  }

  rooms.forEach((room)=>{
    if (!Rooms.findOne(room)) {
      console.log("inserting room " + room)
      Rooms.insert({
        ...RoomSchema.clean({}), _id: room, name: room[0].toUpperCase() + room.substring(1)
      })
    }
  })


});

