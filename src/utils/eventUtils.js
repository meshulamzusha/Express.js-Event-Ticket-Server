import { getFileContent, saveDataToFile } from "../utils/fileUtils.js";


export async function getEvents() {
    try {
        const eventsRaw = await getFileContent('./data/events.json')
        return JSON.parse(eventsRaw);
    } catch (error) {
        throw error;
    }
}