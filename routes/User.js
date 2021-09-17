import express from 'express';
import { getUser, getUserProject, createUserProject, createUser, deleteUserProject } from '../controllers/User.js';
import passport from 'passport';
const router = express.Router();

router.get('/login', getUser, passport.authenticate('local'), (req, res) =>
{
    var userInfo = { uid: req.user._id };
    console.log(userInfo);
    res.send(userInfo);
});
router.get('/oldProject', getUserProject);
router.post('/new', createUserProject)
router.post('/register', createUser, passport.authenticate('local'), (req, res) =>
{
    var userInfo = { uid: req.user._id };
    res.send(userInfo);
});
router.delete('/delete/:pid', deleteUserProject);

export default router;