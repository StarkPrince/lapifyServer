import express from 'express';
import { getData, newData, updateData, getAllProjects, deleteData } from '../controllers/Lapify.js';


const router = express.Router();

router.get('/projects', getAllProjects)
router.get('/:pid', getData)
router.post('/:projectName', newData)
router.put('/:pid', updateData)
router.delete('/:pid', deleteData)

export default router;