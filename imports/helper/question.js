import {
  isSelectedRoomIdChanged,
  getCachedRoomQuestions,
  getSelectedRoomId,
  cacheRoomQuestions
} from './actions';
import { exists, zuffi } from './global';

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
    index = zuffi(own.length);
    result.push(own[index]);
  }
  if (foreign.length > 0) {
    index = zuffi(foreign.length);
    result.push(foreign[index]);
  }
  cacheRoomQuestions(null, result, roomId);
  return result;
}
