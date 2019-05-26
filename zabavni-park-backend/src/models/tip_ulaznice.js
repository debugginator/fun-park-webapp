const tipUlaznice = (sequelize, DataTypes) => {
  const TipUlaznice = sequelize.define('tipUlaznice', {
    naziv: DataTypes.STRING,
    popust: DataTypes.FLOAT,
  });

  TipUlaznice.associate = models => {
    TipUlaznice.belongsTo(models.Kupovina);
    TipUlaznice.hasOne(models.TipUlaznice);
    TipUlaznice.hasOne(models.Atrakcija);
  };

  return TipUlaznice;
};

export default tipUlaznice;
