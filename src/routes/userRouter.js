import express from 'express';
import { isUsernameExist } from '../utils/userUtils.js';
import { addUser } from '../services/usersService.js';

const router = express.Router();


router.post('/user/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                error: "username and password is required.",
            });
        }

        if (typeof username != "string" || typeof password != "string") {
            return res.status(422).json({
                error: "username and password must be string."
            })
        }

        if (await isUsernameExist(username)) {
            return res.status(409).json({
                error: `user with ${username} username already exist`
            })
        }

        const user = await addUser(username, password);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: user
        })

    } catch (error) {
        console.log(error);
    }
})

export default router;