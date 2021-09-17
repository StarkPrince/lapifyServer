import mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    timeStamps: [Number]
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;