//internal import
import { toDo } from './todo.js';
import { createPdf } from './create-pdf.js';
import { config } from './config.js';

// media file directory
const fileDir = config.fileDir;
const baseDir = config.baseDir;

// Main Function
const mainFunction = async () => {
    try {
        const result = await toDo(fileDir, baseDir);
        console.log("result", result);
        const res = await createPdf(result, baseDir);
        console.log(res)

    } catch (error) {
        console.log("Error => ", error);
    }
};

await mainFunction();