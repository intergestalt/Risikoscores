import { Session } from 'meteor/session';

export function exists(v) {
  if (v === null) return false;
  if (v === undefined) return false;
  return true;
}

export function existsNumber(v) {
  if (!exists(v)) return false;
  if (!Number.isInteger(v)) return false;
  return true;
}

export function existsString(v) {
  if (!exists(v)) return false;
  if (v.trim() === '') return false;
  return true;
}

export function localeStr(obj) {
  const fallBack = true;
  const defaultLanguage = 'de';

  var lang = Session.get('language');
  var result = obj[lang];
  console.log('lang ' + lang);
  if (existsString(result)) {
    return result;
  } else {
    if (fallBack) {
      result = obj[defaultLanguage];
      if (existsString(result)) {
        return result;
      }
    }
  }
  return '';
}
