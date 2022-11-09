import * as fs from 'fs';

// internal import
import { getFilesFromDir } from './getFilesFromDir.js';
import { getFramePerSecondFromFileName } from './fpsCount.js';

// media file directory
const fileDir = '/home/rajibhasan/Desktop/gifbuz-tump/MovFile/';


// Main Function
const mainFunction = async () => {
    try {
        const files = await getFilesFromDir(fileDir);
        files.forEach((fileName, index) => {
            console.log(`${index}. ${fileName}`)
        })
    } catch (error) {
        console.log("Error => ", error);
    }
};

mainFunction();
