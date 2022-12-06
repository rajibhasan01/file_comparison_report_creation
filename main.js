//internal import
import { toDo } from './todo.js';
import { createPdf } from './create-pdf.js';
import { config } from './config.js';
import {newtoDo} from './newTodo.js'

// media file directory
const fileDir = config.fileDir;
const baseDir = config.baseDir ? config.baseDir : fileDir;

// Main Function
const mainFunction = async () => {
    try {
        const result = await newtoDo(fileDir, baseDir);
        const res = await createPdf(result, baseDir);
        console.log(res)

    } catch (error) {
        console.log("Error => ", error);
    }
};

await mainFunction();