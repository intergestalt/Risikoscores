import { sortTabs } from './tab';

export function cleanForSave(room) {
  const result = room;
  const sortedTabs = sortTabs(room.subsections);
  result.subsections = sortedTabs;
  return result;
}
