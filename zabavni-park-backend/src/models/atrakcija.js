const atrakcija = (sequelize, DataTypes) => {
  const Atrakcija = sequelize.define('atrakcija', {
    naziv: DataTypes.STRING,
    opis: DataTypes.STRING,
    ocjenaTezine: DataTypes.STRING,
  });

  Atrakcija.associate = models => {
    Atrakcija.belongsTo(models.ZabavniPark);
  };

  return Atrakcija;
};

export default atrakcija;
