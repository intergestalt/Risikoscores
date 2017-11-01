import { existsString } from './global';

export function getImageSrc(asset) {
  var tab = asset.tab;
  if (existsString(tab)) {
    return (imgSrc =
      '/uploads/' + asset.room + '/' + asset.tab + '/' + asset.name);
  } else {
    return (imgSrc = '/uploads/' + asset.room + '/' + asset.name);
  }
}

export function isImage(asset) {
  if (asset.type === 'image') return true;
  return false;
}
