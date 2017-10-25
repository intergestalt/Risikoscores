import { sortTabs } from './tab';
import { localeStr } from './global';
import { findGlossarComponents } from './diyMarkdown';

export function cleanForSave(room) {
  const result = room;
  const sortedTabs = sortTabs(room.subsections);
  result.subsections = sortedTabs;
  return result;
}

export function findGlossar(room) {
  var result = {};

  var mainText = localeStr(room.mainText);
  const g = findGlossarComponents(mainText, false);
  result = { ...result, ...g };

  if (room.subsections) {
    for (var i = 0; i < room.subsections.length; i++) {
      const tab = room.subsections[i];
      const tabText = localeStr(tab.text);
      const g = findGlossarComponents(tabText, false);
      const g2 = findGlossarComponents(tabText, true);
      result = { ...result, ...g, ...g2 };
    }
  }

  return result;
}
