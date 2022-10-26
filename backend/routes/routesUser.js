import express from "express";
const router = express.Router();

import {registerUser, authenticateUser} from '../controllers/userController.js';


router.post('/', registerUser);

router.post('/login', authenticateUser);

export default router;  


    