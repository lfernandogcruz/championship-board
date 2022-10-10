import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';
import MatchesService from '../services/Matches.service';

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.get(
  '/',
  (req, res) => matchesController.findAll(req, res),
);
matchesRouter.get(
  '/:id',
  (req, res) => matchesController.findById(req, res),
);

export default matchesRouter;