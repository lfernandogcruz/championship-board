import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Users extends Model {
  // public <campo>!: <tipo>;
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

Users.init({
  // ... Campos
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Users, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Users, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Users.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Users.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Users;
