import User from '../models/User.js'
import Project from '../models/Project.js'
import md5 from 'md5';

export const getUser = async (req, res) =>
{
    const { email, password } = req.query;
    const user = await User.findOne({ email, password: md5(password) });
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}

export const getUserProject = async (req, res) =>
{
    const { pid, uid } = req.body;
    const project = await Project.findById(pid);
    const user = await User.findById(uid);
    if (project && user) {
        if (user.projects.includes(pid)) {
            res.json(project);
        }
        else {
            res.send("Cannot access this project")
        }
    }
    else if (user) {
        res.send("Cannot find the project")
    }
    else if (project) {
        res.send("Cannot find the user")
    }
    else {
        res.send("Cannot find the project or user")
    }
}

export const createUserProject = async (req, res) =>
{
    const { projectName, uid } = req.body;
    const newtime = new Date();
    const newProject = new Project({
        name: projectName,
        timeStamps: [newtime.getTime()]
    });
    await newProject.save();
    const user = await User.findById(uid);
    user.projects.push(newProject._id);
    await user.save();
    res.json(newProject);
}

export const createUser = async (req, res) =>
{
    console.log(req.body);
    const { name, email, password } = req.body;
    const newUser = new User({
        name,
        email,
        password: md5(password)
    });
    await newUser.save();
    res.status(200).json(newUser);
}

export const deleteUserProject = async (req, res) =>
{
    const { pid } = req.params;
    const { uid } = req.body;
    const user = await User.findById(uid);
    if (user) {
        if (user.projects.includes(pid)) {
            await Project.findByIdAndDelete(pid);
            user.projects.splice(user.projects.indexOf(pid), 1);
            await user.save();
            res.send("Project deleted");
        }
        else {
            res.send("Cannot access this project")
        }
    }
    else {
        res.send("Cannot find the user");
    }
}