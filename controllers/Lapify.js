import Project from '../models/Project.js';
import md5 from 'md5';

export const getData = async (req, res) =>
{
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    res.json(project);
}

export const addData = async (req, res) =>
{
    const { projectName } = req.params;
    const newtime = new Date();
    const newProject = new Project({
        name: projectName,
        timeStamps: [newtime.getTime()]
    });
    await newProject.save();
    res.json(newProject);
}

export const updateData = async (req, res) =>
{
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    const newtime = new Date();
    project.timeStamps.push(newtime.getTime());
    await project.save();
    res.json(project);
}

export const getAllProjects = async (req, res) =>
{
    const pr = await Project.find({});
    res.json(pr);
}