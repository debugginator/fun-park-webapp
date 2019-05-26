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
  ZabavniPark: sequelize.import('./zabavni_park'),
  Atrakcija: sequelize.import('./atrakcija'),
  Osoba: sequelize.import('./osoba'),
  Djelatnik: sequelize.import('./djelatnik'),
  Posjetitelj: sequelize.import('./posjetitelj'),
  Stand: sequelize.import('./stand'),
  Kupovina: sequelize.import('./kupovina'),
  Ulaznica: sequelize.import('./ulaznica'),
  TipUlaznice: sequelize.import('./tip_ulaznice'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
