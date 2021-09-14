import express from 'express';
import { getData, addData, updateData, getAllProjects,deleteData } from '../controllers/Lapify.js';


const router = express.Router();

router.get('/projects', getAllProjects)
router.get('/:projectId', getData)
router.post('/:projectName', addData)
router.put('/:projectId', updateData)
router.delete('/:projectId',deleteData)

export default router;