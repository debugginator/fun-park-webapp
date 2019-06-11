const osoba = (sequelize, DataTypes) => {
  const Osoba = sequelize.define('osoba', {
    ime: DataTypes.STRING,
    prezime: DataTypes.STRING
  });

  Osoba.associate = models => {
    Osoba.hasOne(models.Djelatnik);
  };

  Osoba.associate = models => {
    Osoba.hasOne(models.Posjetitelj);
  };

  return Osoba;
};

export default osoba;
