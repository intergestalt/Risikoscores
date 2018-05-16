import {
  isSelectedRoomIdChanged,
  getSelectedRoomId,
  getCachedStreamQuestions,
  cacheStreamQuestions,
  setCachedQuestions,
  getCachedQuestions
} from './actions';

import { exists, zuffi, shuffleArray } from './global';

export function cleanForSave(entry) {
  const result = entry;
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
    roomObj[room.key] = title;
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

export function storeQuestions(questions) {
  if (Array.isArray(questions)) {
    setCachedQuestions(questions);
  }
}

export function getQuestions(roomId, targetId) {
  const questions = getCachedQuestions();
  var result = [];
  if (exists(questions)) {
    for (var i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (exists(targetId)) {
        if (q.originRoomId == roomId && q.roomId == targetId) {
          result.push(q);
        }
      } else {
        if (q.roomId == roomId) {
          result.push(q);
        }
      }
    }
  }
  return result;
}
