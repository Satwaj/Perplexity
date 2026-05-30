import {Router} from 'express';
import express from 'express';
import { battleController } from '../controllers/battle.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/',  battleController);

export default router;