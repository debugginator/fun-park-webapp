const kupovina = (sequelize, DataTypes) => {
  const Kupovina = sequelize.define('kupovina', {
    barKod: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
  });

  Kupovina.associate = models => {
    Kupovina.hasOne(models.Osoba);
  };

  Kupovina.associate = models => {
    Kupovina.hasOne(models.Atrakcija);
  };

  return Kupovina;
};

export default kupovina;
