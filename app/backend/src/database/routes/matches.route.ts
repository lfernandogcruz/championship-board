import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';
import MatchesService from '../services/Matches.service';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.get(
  '/',
  matchesController.findAll,
);
matchesRouter.get(
  '/:id',
  matchesController.findById,
);

export default matchesRouter;
