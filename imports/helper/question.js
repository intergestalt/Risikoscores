import {
  isSelectedRoomIdChanged,
  getCachedRoomQuestions,
  getSelectedRoomId,
  cacheRoomQuestions,
  getCachedStreamQuestions,
  cacheStreamQuestions,
  getStreamIndex
} from './actions';

import { exists, zuffi, shuffleArray, localeStr } from './global';

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
      console.log('PUSH 1');
      console.log(q);
      own.push(q);
    }
    if (q.originRoomId === roomId) {
      console.log('PUSH 2');
      console.log(q);
      foreign.push(q);
    }
  }
  if (own.length > 0) {
    index = zuffi(own.length - 1);
    console.log('index 1 ' + index);
    result.push(own[index]);
  }
  if (foreign.length > 0) {
    index = zuffi(foreign.length - 1);
    console.log('index 2 ' + index);
    result.push(foreign[index]);
  }
  cacheRoomQuestions(null, result, roomId);
  return result;
}

export function getStreamQuestions(all, rooms) {
  const index = getStreamIndex();
  var last = getCachedStreamQuestions();
  if (exists(last)) {
    console.log('LAST');
    return last.slice(0, index);
  }
  console.log('FRESH');
  var roomObj = {};
  for (var i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const title = localeStr(room.name);
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

  cacheStreamQuestions(null, result);
  return result.slice(0, index);
}

export function setLoading(index, yes) {
  var last = getCachedStreamQuestions();
  if (exists(last)) {
    last[index].loading = yes;
    cacheStreamQuestions(null, last);
  }
}
