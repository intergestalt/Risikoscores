import { existsString, exists } from './global';
import { setTabSlider, getTabSlider } from './actions';
import { getUrlPrefix } from '../helper/uploads';

export function getImageSrc(asset, roomVariant = false) {
  var subfolder = asset.subfolder;
  if (!asset.name || asset.name.toLowerCase() === "fehlt" || asset.name === "-") {
    return `//dummyimage.com/600x400/000655/fff&text=${asset.title ? (asset.title.de || asset.title.en) : "(fehlt)"}&ignore=`
  }
  if (existsString(subfolder)) {
    return (imgSrc =
      getUrlPrefix(roomVariant) + '/' + asset.folder + '/' + subfolder + '/' + asset.name);
  } else {
    return (imgSrc = getUrlPrefix(roomVariant) + '/' + asset.folder + '/' + asset.name);
  }
}

export function isImage(asset) {
  if (asset.type === 'image') return true;
  return false;
}

export function annotateAsset(asset, text, source) {
  return {
    ...asset,
    text: text,
    source: source
  };
}

export function getImageAsset(asset, folder, subfolder) {
  if (existsString(subfolder)) {
    return {
      ...asset,
      type: 'image',
      folder: folder,
      subfolder: subfolder
    };
  }
  return {
    ...asset,
    type: 'image',
    folder: folder,
    subfolder: null
  };
}

export function getAllSliderAssets(text, room, tab) {
  var result = [];
  var index = text.indexOf('"asset"');
  while (index !== -1) {
    try {
      var start = text.indexOf('{', index);
      var end = text.indexOf('}', index);
      if (start !== -1 && end !== -1) {
        var assetStr = text.substring(start, end + 1);
        var asset = JSON.parse(assetStr);
        result.push(getImageAsset(asset, room, tab));
      }
    } catch (e) {
      console.log(e);
    }
    index = text.indexOf('"asset"', index + 1);
  }
  return result;
}

export function updateTabSliderAssets(text, room, tab) {
  var slider = getTabSlider(room, tab);
  if (!exists(slider)) {
    slider = { room: room, tab: tab };
    slider.list = getAllSliderAssets(text, room, tab);
    setTabSlider(slider);
  }
}

export function equals(a1, a2) {
  try {
    if (a1.type === a2.type) {
      if (a1.folder === a2.folder) {
        if (a1.subfolder === a2.subfolder) {
          if (a1.name === a2.name) {
            return true;
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

export function getSliderAssetIndex(asset) {
  var slider = getTabSlider();
  if (!exists(slider)) {
    return -1;
  }
  for (var i = 0; i < slider.list.length; i++) {
    var listAsset = slider.list[i];
    if (equals(asset, listAsset)) {
      return i;
    }
  }
  return 0;
}
