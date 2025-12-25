import express from 'express';
import userRouter from './routes/userRouter.js';
import eventRouter from './routes/eventRouter.js';
import buyTicketsRouter from './routes/buyTicketsRouter.js';
import purchaseSummaryRouter from './routes/purchaseSummeryRouter.js'

const app = express();
const port = 3000;

app.use(express.json())


app.use(purchaseSummaryRouter)
app.use(userRouter);
app.use(eventRouter);
app.use(buyTicketsRouter);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})