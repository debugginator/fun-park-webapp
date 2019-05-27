const zabavniPark = (sequelize, DataTypes) => {
  const ZabavniPark = sequelize.define('zabavniPark', {
    naziv: {
      type: DataTypes.STRING,
      unique: true,
    },
    pozadinskaSlika: DataTypes.STRING,
    opis: DataTypes.STRING
  });

  ZabavniPark.associate = models => {
    ZabavniPark.hasMany(models.Atrakcija, { onDelete: 'CASCADE' });
  };

  return ZabavniPark;
};

export default zabavniPark;
