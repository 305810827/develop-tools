import fs from 'fs'
import path from 'path'

// 获取目录下的所有文件
export function getFilesInDirectory(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    const fileNames = files.map((file) => {
        const filePath = path.join(dir, file.name);
        return file.isDirectory() ? getFilesInDirectory(filePath) : filePath;
    });
    return fileNames.flat();
}