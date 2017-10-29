import recursive from "recursive-readdir";
import mkdir from 'mkdir-recursive';
import path from 'path';
import fs from 'fs';
import im from 'imagemagick';
import { imageSizes } from '../config/imagesSizes';

const wrapWithPromise = wrappedFunction => (...args) => (
  new Promise((resolve, reject) => {
    wrappedFunction(...args, (err, result) => {
      return err ? reject(err) : resolve(result);
    });
  })
);

function convertableImagesIgnoreFunc(file, stats) {
  // ignore files that are not images that should get converted
  const allow = ['.jpg', '.png', '.jpeg'];
  console.log(file)
  return /*stats.isDirectory() ||*/ allow.indexOf(path.extname(file)) === -1;
}

async function getImageDimensions(file) {
  const result = await identifyPromise(['-format', '{"width":%w, "height":%h}', file]);
  return JSON.parse(result);
}

const resizePromise = wrapWithPromise(im.resize)
const identifyPromise = wrapWithPromise(im.identify)

function convertImages(force = false) {
  console.log("processing images")
  recursive(global.uploads_dir, async function (err, files) {
    // filter images
    const validFiles = files.filter((file) => (['.jpg', '.png', '.jpeg'].indexOf(path.extname(file)) > -1))

    // loop images
    for (let file of validFiles) {
      const p = path.parse(file);
      const dirRelativeToUploads = p.dir.substr(global.uploads_dir.length);

      // loop image sizes
      for (let [size, settings] of Object.entries(imageSizes)) {

        const destFile = global.cache_dir + dirRelativeToUploads + '/' + p.name + '_' + size + p.ext;
        mkdir.mkdirSync(path.dirname(destFile));

        process.stdout.write(`processing ${dirRelativeToUploads}/${p.base} -> ${path.basename(destFile)} ...`);

        if (!force && fs.existsSync(destFile)) {
          console.log("destination file exists, skipping")
          continue;
        }

        const dimensions = await getImageDimensions(file);

        if (settings.width > dimensions.width) {
          process.stdout.write("too small, using original dimensions ...");
          //continue;
          settings.width = dimensions.width;
        }

        const result = await resizePromise({
          srcPath: file,
          dstPath: destFile,
          strip: true,
          customArgs: ['-auto-orient'],
          ...settings
        });
        console.log("done");
      }

    }
  });
}

function clearCache() {
  console.log("processing images")
  recursive(global.cache_dir, async function (err, files) {
    // loop files
    for (let file of files) {
      console.log("removing " + file)
      fs.unlink(file)
    }
  })
}

export { convertImages, clearCache }