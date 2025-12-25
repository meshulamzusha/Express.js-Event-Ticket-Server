import { promises } from 'fs';


export async function saveDataToFile(path, data) {
    try {
        await promises.writeFile(path, data);
    } catch (error) {
        throw error;
    }
}


export async function getFileContent(path) {
    try {
        const data = await promises.readFile(path, 'utf8');
        return data;
    } catch (error) {
        throw error;
    }
}