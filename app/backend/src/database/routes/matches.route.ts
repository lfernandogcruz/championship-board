import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';
import tokenValidation from '../middlewares/tokenValidation';
import middlewares from '../middlewares/bodyValidations';
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
matchesRouter.post(
  '/',
  tokenValidation,
  middlewares.postMatchesFieldsValidation,
  middlewares.differentTeamsValidation,
  (req, res) => matchesController.create(req, res),
);
matchesRouter.patch(
  '/:id/finish',
  tokenValidation,
  (req, res) => matchesController.finishMatch(req, res),
);

export default matchesRouter;
