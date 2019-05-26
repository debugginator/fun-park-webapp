import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
  ZabavniPark: sequelize.import('./zabavni_park'),
  Atrakcija: sequelize.import('./atrakcija'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
