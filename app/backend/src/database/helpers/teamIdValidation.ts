import Teams from '../models/Teams.model';

const teamIdValidation = async (
  teamHomeId: number,
  teamAwayId: number,
): Promise<boolean> => {
  const teamHome = await Teams.findByPk(teamHomeId);
  const teamAway = await Teams.findByPk(teamAwayId);
  if (!teamHome || !teamAway) return false;
  return true;
};

export default teamIdValidation;
