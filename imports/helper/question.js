import {
  isSelectedRoomIdChanged,
  getCachedRoomQuestions,
  getSelectedRoomId,
  cacheRoomQuestions,
  getCachedStreamQuestions,
  cacheStreamQuestions,
  getStreamIndex
} from './actions';

import { exists, zuffi, shuffleArray } from './global';

export function cleanForSave(entry) {
  const result = entry;
  return result;
}

export function getRoomQuestions(all) {
  var roomId = getSelectedRoomId();

  var last = getCachedRoomQuestions();
  if (exists(last)) {
    var lastRoomId = last.roomId;
    if (exists(lastRoomId)) {
      if (lastRoomId === roomId) {
        const r = last.questions;
        if (exists(r)) {
          return r;
        }
      }
    }
  }
  var result = [];
  var own = [];
  var foreign = [];
  for (var i = 0; i < all.length; i++) {
    const q = all[i];
    if (q.roomId === roomId) {
      own.push(q);
    }
    if (q.originRoomId === roomId) {
      foreign.push(q);
    }
  }
  if (own.length > 0) {
    //index = zuffi(own.length - 1);
    for (var i = 0; i < own.length; i++) {
      result.push(own[i]);
    }
  }
  if (foreign.length > 0) {
    //index = zuffi(foreign.length - 1);
    for (var i = 0; i < foreign.length; i++) {
      result.push(foreign[i]);
    }
  }
  cacheRoomQuestions(result, roomId);
  return result;
}

export function getStreamQuestions(all, rooms, index) {
  var last = getCachedStreamQuestions();
  if (exists(last)) {
    if (index > last.length) {
      index = last.length;
    }
    return last.slice(0, index);
  }
  var roomObj = {};
  for (var i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const title = room.name;
    roomObj[room._id] = title;
  }
  var result = [];
  all = shuffleArray(all);
  for (var i = 0; i < all.length; i++) {
    const q = all[i];
    q.title = roomObj[q.roomId];
    q.loading = true;
    result.push(q);
  }

  cacheStreamQuestions(result);
  if (index > result.length) {
    index = result.length;
  }
  return result.slice(0, index);
}

export function setLoading(index, yes) {
  var last = getCachedStreamQuestions();
  if (exists(last)) {
    last[index].loading = yes;
    cacheStreamQuestions(last);
  }
}
