export function getImageSrc(asset) {
  const imgSrc = '/uploads/' + asset.room + '/' + asset.tab + '/' + asset.name;
  return imgSrc;
}

export function isImage(asset) {
  if (asset.type === 'image') return true;
  return false;
}
