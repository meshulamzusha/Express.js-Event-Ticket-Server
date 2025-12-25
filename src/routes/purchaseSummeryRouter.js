import express from 'express';
import { isUsernameExist } from '../utils/userUtils.js';
import { SummarizePurchases } from '../services/purchaseSummaryService.js';

const router = express.Router();

router.get('/users/summary/:username', async (req, res) => {
    try {
        const username = req.params.username
        
        if (!(await isUsernameExist(username))) {
            return res.status(404).json({
                error: "user name not exist"
            })
        }

        const summary = await SummarizePurchases(username)
        
        if (summary == 0) {
            res.send(0)
        }

        res.json(summary)
    } catch (error) {
        console.log(error);
    }
})

export default router