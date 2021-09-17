import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import lapRoutes from './routes/Lapify.js';
import userRoutes from './routes/User.js'
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';



const app = express();
dotenv.config()

//use bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


app.use(session({
    secret: 'myPPisnotthatBig?',
    resave: false,
    saveUninitialized: false
}))
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.use((req, res, next) =>
{
    console.log('req.session', req.session);
    next()
});
app.use(passport.initialize())
app.use(passport.session())
//serialize and deserialize the passport object
passport.serializeUser((user, done) =>
{
    done(null, user);
})
passport.deserializeUser((obj, done) =>
{
    done(null, obj);
})


app.use('/lap', lapRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) =>
{
    res.send('Hello from lapify')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

    // CONNECTION_URL=mongodb+srv://StarkPrince:M14t85u2m1nt93S@cluster0.bmaqq.mongodb.net/lapify?retryWrites=true&w=majority