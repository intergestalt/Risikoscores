import { sortTabs } from './tab';
import { localeStr, exists } from './global';
import { findGlossarComponents } from './diyMarkdown';
import { setCachedRooms, getCachedRooms } from './actions';

export function cleanForSave(room) {
  const result = room;
  const sortedTabs = sortTabs(room.subsections);
  result.subsections = sortedTabs;
  return result;
}

export function findGlossar(room) {
  var result = {};

  var mainText = localeStr(room.mainText);
  const g = findGlossarComponents(mainText);
  result = { ...result, ...g };

  if (room.subsections) {
    for (var i = 0; i < room.subsections.length; i++) {
      const tab = room.subsections[i];
      const tabText = localeStr(tab.text);
      const g = findGlossarComponents(tabText);
      const g2 = findGlossarComponents(tabText);
      result = { ...result, ...g, ...g2 };
    }
  }

  return result;
}

export function storeRooms(rooms) {
  if (!exists(rooms)) {
    return;
  }
  if (rooms.length <= 0) {
    return;
  }
  if (exists(getCachedRooms())) return;
  if (Array.isArray(rooms)) {
    var result = {};
    for (var i = 0; i < rooms.length; i++) {
      const r = rooms[i];
      result[r._id] = r.name;
    }
    setCachedRooms(result);
  }
}
