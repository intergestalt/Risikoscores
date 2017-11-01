import { existsString } from './global';

export function getImageSrc(asset) {
  var subfolder = asset.subfolder;
  if (existsString(subfolder)) {
    return (imgSrc =
      '/uploads/' + asset.folder + '/' + subfolder + '/' + asset.name);
  } else {
    return (imgSrc = '/uploads/' + asset.folder + '/' + asset.name);
  }
}

export function isImage(asset) {
  if (asset.type === 'image') return true;
  return false;
}

export function getImageAsset(name, folder, subfolder) {
  if (existsString(subfolder)) {
    return {
      type: 'image',
      folder: folder,
      subfolder: subfolder,
      name: name
    };
  }
  return {
    type: 'image',
    folder: folder,
    subfolder: null,
    name: name
  };
}
