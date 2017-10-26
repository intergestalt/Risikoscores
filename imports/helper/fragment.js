import { Session } from 'meteor/session';
import { localeStr, exists } from './global';

export function cleanForSave(entry) {
  const result = entry;
  return result;
}

export function storeFragments(fragments) {
  if (Array.isArray(fragments)) {
    var result = {};
    for (var i = 0; i < fragments.length; i++) {
      const f = fragments[i];
      result[f._id] = fragments[i];
    }
    Session.set('fragments', result);
  }
}

export function getFragment(key, lang = null) {
  const fragments = Session.get('fragments');
  if (!exists(fragments)) return '';
  const fragment = fragments[key];
  if (!exists(fragment)) return '';
  return localeStr(fragment.text, lang);
}
