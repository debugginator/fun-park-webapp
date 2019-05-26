const ulaznica = (sequelize, DataTypes) => {
  const Ulaznica = sequelize.define('ulaznica', {
    cijena: DataTypes.FLOAT,
  });

  Ulaznica.associate = models => {
    Ulaznica.belongsTo(models.Kupovina);
    Ulaznica.hasOne(models.TipUlaznice);
    Ulaznica.hasOne(models.Atrakcija);
  };

  return Ulaznica;
};

export default ulaznica;
