import {Router} from 'express';
import express from 'express';
import { battleController, getAllBattles, deleteBattle } from '../controllers/battle.controller.js';


const router = express.Router();

// POST - Create new battle
router.post('/', battleController);

// GET - Get all battles
router.get('/', getAllBattles);

// DELETE - Delete specific battle
router.delete('/:battleId', deleteBattle);

export default router;