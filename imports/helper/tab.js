import { existsNumber, existsString, exists } from './global';

function compareTabs(tab1, tab2) {
  var order1 = -1;
  var order2 = -1;
  if (existsNumber(tab1.order)) {
    order1 = tab1.order;
  }
  if (existsNumber(tab2.order)) {
    order2 = tab2.order;
  }
  return order1 - order2;
}

export function sortTabs(tabs) {
  return tabs.sort(compareTabs);
}

export function getSelectedTab(selectedTabId, tabs) {
  if (!exists(tabs)) {
    return null;
  }
  if (tabs.length === 0) {
    return null;
  }
  if (existsString(selectedTabId)) {
    for (var i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if (tab.identifier === selectedTabId) {
        return tab;
      }
    }
  }
  return tabs[0];
}

export function getDefaultTabId(tabs) {
  if (!exists(tabs)) {
    return null;
  }
  if (tabs.length === 0) {
    return null;
  }
  return tabs[0].identifier;
}
