import express from 'express';
import { isUserRegistered, isUsernameExist } from '../utils/userUtils.js';
import { addEvent } from '../services/eventService.js';

const router = express.Router();

router.use(async (req, res, next) => {
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

        if (!(await isUsernameExist(username))) {
            return res.status(403).json({
                error: "You need to register to perform this action."
            })
        }

        if (!(await isUserRegistered(username, password))) {
            return res.status(401).json({
                error: "Incorrect password"
            })
        }

        next();

    } catch (error) {
        console.log(error);
    }
})

router.post('/creator/events', async (req, res) => {
    try {
        const { eventName, ticketsForSale } = req.body;

        if (!eventName || !ticketsForSale) {
            return res.status(400).json({
                error: "eventName and ticketForSale is required.",
            });
        }

        if (typeof eventName != "string" || typeof ticketsForSale != "number" || ticketsForSale < 0) {
            return res.status(422).json({
                error: "The event name must be a string. " +
                "The number of tickets must be a positive number."
            })
        }

        const event = await addEvent(req.body)
        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event: event
        })

    } catch (error) {
        console.log(error);
    }
})

export default router;