const zabavniPark = (sequelize, DataTypes) => {
  const ZabavniPark = sequelize.define('zabavniPark', {
    naziv: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  ZabavniPark.associate = models => {
    ZabavniPark.hasMany(models.Atrakcija, { onDelete: 'CASCADE' });
  };

  return ZabavniPark;
};

export default zabavniPark;
