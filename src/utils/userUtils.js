import { getUsers } from "../services/usersService.js";


export async function isUsernameExist(username) {
    try {
        let exist = true;
        const users = await getUsers();
        const user = users.find(u => u.username == username);

        if (!user) {
            exist = false;
        }

        return exist;

    } catch (error) {
        throw error;
    }
}


export async function isUserRegistered(username, password) {
    try {
        let registered = true;
        const users = await getUsers();
        const user = users.find(u => 
            u.username == username && u.password == password
        );

        if (!user) {
            registered = false;
        }

        return registered;

    } catch (error) {
        throw error;
    }
}