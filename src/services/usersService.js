import { getFileContent, saveDataToFile } from "../utils/fileUtils.js";


export async function getUsers() {
    try {
        const usersRaw = await getFileContent('./data/users.json')
        return JSON.parse(usersRaw);
    } catch (error) {
        throw error;
    }
}


export async function addUser(username, password) {
    try {
        const users = await getUsers();
        const user = {
            username: username,
            password: password
        }
        users.push(user);
        await saveDataToFile('./data/users.json', JSON.stringify(users, null, 2));

        return user
    } catch (error) {
        throw error;
    }
}
