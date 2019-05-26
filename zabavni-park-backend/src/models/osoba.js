const osoba = (sequelize, DataTypes) => {
  const Osoba = sequelize.define('osoba', {
    Ime: DataTypes.STRING,
    Prezime: DataTypes.STRING
  });

  Osoba.associate = models => {
    Osoba.hasMany(models.Djelatnik);
  };

  Osoba.associate = models => {
    Osoba.hasMany(models.Posjetitelj);
  };

  return Osoba;
};

export default osoba;
