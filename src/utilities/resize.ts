import sharp from 'sharp';
import path from 'path';
import fs, {promises as fsPromise} from 'fs'

const resize = async (filename: string, width: string, height: string) => {
  // Arranging paths
  const sourcePath = path.join(__dirname, '../../images/');
  const targetPath = path.join(__dirname, '../../thumb/');
  const sourceImage = `${filename}.jpg`
  const targetImage = `${filename}_${width}_${height}.jpg`

  // Create thumbs directory if it doesn't exist
  if(!fs.existsSync(targetPath)) await fsPromise.mkdir(targetPath)

  // Cashing
  try{
    // Non-existent source image
    if(!fs.existsSync(sourcePath + sourceImage)) {
      return {created: null, path: null}
    }

    // Create image
    if(!fs.existsSync(targetPath + targetImage)) {
      await sharp(sourcePath + sourceImage).resize(parseInt(width), parseInt(height)).toFile(targetPath + targetImage)
      return {created: true, path: targetPath + targetImage}
    }

    // Reuse cached image
    else if(fs.existsSync(targetPath)) return {created: false, path: targetPath + targetImage}

  } catch(err) {
    return undefined
  }
};

export default resize;
