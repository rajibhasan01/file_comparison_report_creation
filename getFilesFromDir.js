
import * as fs from 'fs';

export const getFilesFromDir = async (fileDir) => {
    let files;
    try {
        files = await fs.promises.readdir(fileDir);
    } catch (error) {
        console.log('Error occurred while reading directory!', error);
        throw error;
    } finally {
        return files;
    }
};