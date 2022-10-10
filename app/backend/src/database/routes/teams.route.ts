import { Router } from 'express';
import TeamsController from '../controllers/Teams.controller';
import TeamsService from '../services/Teams.service';

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

const teamsRouter = Router();

teamsRouter.get(
  '/',
  teamsController.findAll,
);
teamsRouter.get(
  '/:id',
  teamsController.findById,
);

export default teamsRouter;
