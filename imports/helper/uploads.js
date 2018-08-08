import recursive from "recursive-readdir";
import mkdir from 'mkdir-recursive';
import path from 'path';
import parsePath from 'parse-filepath'; // for client-side
import fs from 'fs';
import im from 'imagemagick';
import UploadsStatus from '../collections/uploadsStatus';
import Uploads from '../collections/uploads';
import { imageSizes } from '../config/imagesSizes';
import { uploads_dir, cache_dir, url_prefix } from '../config/uploads';
import { variants } from '../config/variants';

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
  recursive(uploads_dir, async function (err, files) {
    // filter images
    const validFiles = files.filter((file) => (['.jpg', '.png', '.jpeg'].indexOf(path.extname(file)) > -1))

    // update status
    updateStatus({ processing: true })
    updateStatus({ totalConvertibleImageFiles: validFiles.length })

    // loop images
    let index = 0;
    for (let file of validFiles) {

      index++;
      updateStatus({ totalConvertedImageFiles: index })

      const p = path.parse(file);
      const dirRelativeToUploads = p.dir.substr(uploads_dir.length);

      // loop image sizes
      for (let sizeObj of imageSizes) {

        const destFile = cache_dir + generateFilepath(dirRelativeToUploads + '/' + p.base, sizeObj);
        mkdir.mkdirSync(path.dirname(destFile));

        process.stdout.write(`processing ${dirRelativeToUploads}/${p.base} -> ${path.basename(destFile)} ...`);

        if (!force && fs.existsSync(destFile)) {
          console.log("destination file exists, skipping")
          continue;
        }

        updateStatus({ processingFile: `${dirRelativeToUploads}/${path.basename(destFile)}` })
        const uploadId = `${dirRelativeToUploads}/${p.base}`
        Uploads.upsert({ _id: uploadId }, {
          $set: { _id: uploadId }
        })

        const dimensions = await getImageDimensions(file);

        if (sizeObj.width > dimensions.width) {
          process.stdout.write("too small, using original dimensions ...");
          //continue;
          targetWidth = dimensions.width;
        } else {
          targetWidth = sizeObj.width;
        }

        process.stdout.write("" + targetWidth + "w ...")

        const result = await resizePromise({
          srcPath: file,
          dstPath: destFile,
          strip: true,
          customArgs: ['-bordercolor', 'none', '-border', '1x1', '-trim', '-auto-orient', '+repage', '-density', '75'],
          width: targetWidth,
          quality: sizeObj.quality,
        });

        console.log("done");
      }

    }

    updateStatus({ processing: false, processingFile: null })
    console.log("done processing images")
  });
}

function updateStatus(state) {
  // update status
  UploadsStatus.upsert({ _id: 1 }, {
    $set: state
  })
}

function clearCache() {
  console.log("processing images")
  Uploads.remove({}, { multi: true })
  recursive(cache_dir, async function (err, files) {
    // loop files
    for (let file of files) {
      console.log("removing " + file)
      fs.unlink(file)
    }
  })
}

function generateFilepath(orig_path, sizeObj) {
  const p = parsePath(orig_path);
  return p.dir + '/' + p.name + '_' + sizeObj.name + p.ext;
}

function getSrcsetString(orig_path, sizeName = false) {
  // choose sizes
  let selectedSizes = [];
  if (sizeName === false) {
    selectedSizes = imageSizes;
  } else {
    for (sizeObj of imageSizes) {
      if (sizeObj.name.indexOf(sizeName) > -1) {
        selectedSizes.push(sizeObj)
      }
    }
  }

  // generate string
  if (selectedSizes.length > 0) {
    const out = [];
    for (let sizeObj of selectedSizes) {
      out.push(`${generateFilepath(orig_path, sizeObj)} ${sizeObj.width}w`);
    }
    return out.join(', ')
  } else {
    return false;
  }
}

function getUrlPrefix(roomVariant = false) {
  if (!roomVariant) {
    return url_prefix
  } else {
    const variantDir = variants.find(v => (v._id == roomVariant)).dir
    return url_prefix + (variantDir === "" ? "" : '/') + variantDir
  }
}

export { convertImages, clearCache, getSrcsetString, getUrlPrefix }