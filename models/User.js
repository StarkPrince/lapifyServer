import mongoose from 'mongoose';
import { ProjectSchema } from './Project.js';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    projects: [String]
});

const User = mongoose.model('User', UserSchema);

export default User;