import express from 'express';
import { buyTickets } from '../services/buyTicketsService.js'
import { isUsernameExist, isUserRegistered } from '../utils/userUtils.js';
const router = express.Router()

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


router.post('/users/tickets/buy', async (req, res) => {
    try {
        const body = req.body
        const buy = await buyTickets(body)

        if (buy.status == 200)
        res.status(200).json({
            success: true,
            message: "Tickets purchased successfully",
            receipt: buy.receipt
        })

        if (buy.status == 422) {
            res.status(422).json({
                error: "There are not enough tickets for the event."
            })
        }

        if (buy.status == 404) {
            res.status(404).json({
                error: `There is no event named ${req.body.eventName}`
            })
        }
    } catch (error) {
        console.log(error);
    }
})

export default router