import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Teams extends Model {
  // public <campo>!: <tipo>;
  public id!: number;
  public teamName!: string;
}

Teams.init({
  // ... Campos
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Teams, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Teams, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Teams.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Teams.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Teams;
