import * as path from 'path';
import * as fs from 'fs';

// internal import
import { getFilesFromDir } from './getFilesFromDir.js';
import { getFileSize } from './fileSize.js';
import { getFramePerSecondFromFileName } from './fpsCount.js';
import { convertHdToSdGif, copyHDtoSD } from './convertSdFromHd.js';
import { createGifThumb } from './createGifThump.js';
// import { avrgRightCornerColor } from './addTextToGif.js';

export const newtoDo = async (fileDir, tragetDir) => {
    return new Promise(async(resolve, reject) => {
        try {
            const sdDir = `${tragetDir}/SD`;
            const gifThump = `${tragetDir}/GifThumb`;

            if (!fs.existsSync(sdDir)) {
                fs.mkdirSync(sdDir);
            }

            if (!fs.existsSync(gifThump)) {
                fs.mkdirSync(gifThump);
            }

            const result = [];
            let itemsProcessed = 0;
            let count = 0;
            let sdFail = 0;

            const files = await getFilesFromDir(fileDir);
            files.forEach(async(fileName, index) => {


                    const fps = await getFramePerSecondFromFileName(`${fileDir}/${fileName}`);

                    const key = fileName.split('-hd')[0];

                    // // Create SD gif from media file
                    await convertHdToSdGif(`${fileDir}/${fileName}`, `${sdDir}/${key}`, fps.SDFps, fps.width);
                    await createGifThumb(`${fileDir}/${fileName}`, `${gifThump}/${key}`, fps.HDFps);

                    // Get the file size
                    const size = await getFileSize(`${fileDir}/${fileName}`);
                    let sdSize = await getFileSize(`${sdDir}/${key}`);
                    const thumb = await getFileSize(`${gifThump}/${key}-200px`);

                    while(sdSize.bytes > size.bytes){

                        if(fps.SDFps > 6){
                            fps.SDFps = fps.SDFps <= 7 ? fps.SDFps - 1 : fps.SDFps < 10 ? fps.SDFps - 2 : fps.SDFps < 15 ? fps.SDFps - 3 : fps.SDFps - 4;
                            await convertHdToSdGif(`${fileDir}/${fileName}`, `${sdDir}/${key}`, fps.SDFps, fps.width);
                            sdSize = await getFileSize(`${sdDir}/${key}`);
                        }
                        else {
                            await copyHDtoSD(`${fileDir}/${fileName}`, `${sdDir}/${key}`, fps.SDFps, fps.width);
                            sdSize = await getFileSize(`${sdDir}/${key}`);
                            break;
                        }
                    }

                    const fileDetails = {};
                    fileDetails["Name"] = fileName;
                    fileDetails["OriginalWidth"] = fps.OriginalWidth;
                    fileDetails["CustomWidth"] = fps.width;
                    fileDetails["DefaultFps"] = fps.original;
                    fileDetails["SDFps"] = fps.SDFps;
                    fileDetails["OrginalSizeInByte"] = size.bytes;
                    fileDetails["OrginalSizeInMB"] = Number(size.mb.toFixed(2));
                    fileDetails["SDSizeInByte"] = sdSize.bytes;
                    fileDetails["SDSizeInMB"] = Number(sdSize.mb.toFixed(2));
                    fileDetails["ThumbSizeInByte"] = thumb.bytes;
                    fileDetails["ThumbSizeInMB"] = Number(thumb.mb.toFixed(2));

                    if(fileDetails.SDSizeInByte > fileDetails.OrginalSizeInByte) {
                        sdFail = sdFail + 1;
                    }

                    result[count++] = fileDetails;

                // console.log(`${index}. ${fileName} ================== ${fps.original} ==== ${fps.HDFps} ==== ${fps.SDFps} ==== ${size.bytes}`);

                itemsProcessed++;
                if(itemsProcessed === files.length) {
                    console.log(result);
                    result.push({sdFail})
                    resolve(result);
                }

            });
        } catch (error){
            reject(error);
            throw error;
        }

    }).catch((error) => {
        throw error;
    })
}