//internal import
import { toDo } from './todo.js';
import { createPdf } from './create-pdf.js';

// media file directory
const fileDir = '/home/rajibhasan/Desktop/gifBuzTestfile/originalFile';
const baseDir = '/home/rajibhasan/Desktop/gifBuzTestfile';

// Main Function
const mainFunction = async () => {
    try {
        const result = await toDo(fileDir, baseDir);
        console.log("result", result);
        const res = await createPdf(result);
        console.log(res)

    } catch (error) {
        console.log("Error => ", error);
    }
};

await mainFunction();