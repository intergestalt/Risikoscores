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
  if (!exists(obj)) return '';
  const fallBack = true;
  const defaultLanguage = 'de';

  var lang = Session.get('language');
  var result = obj[lang];
  if (existsString(result)) {
    return result.trim();
  } else {
    if (fallBack) {
      result = obj[defaultLanguage];
      if (existsString(result)) {
        return result.trim();
      }
    }
  }
  return '';
}

export function zuffi(max) {
  var zuffi = Math.round(Math.random() * max);
  if (zuffi < 0) zuffi = 0;
  if (zuffi > max) index = max;
  return zuffi;
}
