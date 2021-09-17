import Project from '../models/Project.js';

export const getData = async (req, res) =>
{
    const { pid } = req.params;
    const project = await Project.findById(pid);
    res.json(project);
}

export const newData = async (req, res) =>
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
    const { pid } = req.params;
    const project = await Project.findById(pid);
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

export const deleteData = async (req, res) =>
{
    await Project.findByIdAndDelete(req.params.pid);
    res.json({ message: 'Project deleted' });
}