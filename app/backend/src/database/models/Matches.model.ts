import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';
import Teams from './Teams.model';

class Matches extends Model {
  // public <campo>!: <tipo>;
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Matches.init({
  // ... Campos
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Matches, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Matches, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Matches.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Matches.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
Teams.hasMany(Matches, { foreignKey: 'home_team', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'away_team', as: 'awayTeam' });

Matches.belongsToMany(Teams, { foreignKey: 'home_team', as: 'homeTeam', through: 'home_team' });
Matches.belongsToMany(Teams, { foreignKey: 'away_team', as: 'awayTeam', through: 'away_team' });

export default Matches;
