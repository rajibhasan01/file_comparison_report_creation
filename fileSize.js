import * as fs from 'fs';

export const getFileSize = async (fileDir) => {
    let fileSize = {};
    try {
        const stats = fs.statSync(fileDir);
        fileSize["bytes"] = stats.size;
        fileSize["mb"] = stats.size / (1024*1024);
    } catch (error) {
        console.log('Error occurred while calculate file size!', error);
        throw error;
    } finally {
        return fileSize;
    }
};