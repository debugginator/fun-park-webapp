const atrakcija = (sequelize, DataTypes) => {
  const Atrakcija = sequelize.define('atrakcija', {
    naziv: DataTypes.STRING,
    opis: DataTypes.STRING,
    ocjenaTezine: DataTypes.INTEGER,
    avatarURL: DataTypes.STRING,
  });

  Atrakcija.associate = models => {
    Atrakcija.belongsTo(models.ZabavniPark);
    Atrakcija.hasOne(models.Stand);
    Atrakcija.hasMany(models.Djelatnik);
  };

  return Atrakcija;
};

export default atrakcija;
