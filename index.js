import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import lapRoutes from './routes/Lapify.js';
import dotenv from 'dotenv';


const app = express();
dotenv.config()

//use bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.use('/lap', lapRoutes);

app.get('/', (req, res) =>
{
    res.send('Hello from lapify')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));