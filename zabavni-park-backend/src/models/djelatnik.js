const djelatnik = (sequelize, DataTypes) => {
  const Djelatnik = sequelize.define('djelatnik', {
    brRadneKnjizice: DataTypes.INTEGER,
    brTekucegRacuna: DataTypes.INTEGER,
  });

  Djelatnik.associate = models => {
    Djelatnik.belongsTo(models.Osoba);
  };

  return Djelatnik;
};

export default djelatnik;
