import express from 'express';
import cors from 'cors';
import "./loadEnvironment";
import listsRouter from './routes/lists.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/lists', listsRouter);

app.use(errorHandler);


app.listen(port, () => { 
  console.log(`Running on port: ${port}`);
});