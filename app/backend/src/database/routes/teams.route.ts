import { Router } from 'express';
import TeamsController from '../controllers/Teams.controller';
import TeamsService from '../services/Teams.service';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const teamsRouter = Router();

teamsRouter.get(
  '/',
  (req, res) => teamsController.findAll(req, res),
);
teamsRouter.get(
  '/:id',
  (req, res) => teamsController.findById(req, res),
);

export default teamsRouter;
