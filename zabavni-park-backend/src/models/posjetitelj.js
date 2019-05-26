const posjetitelj = (sequelize, DataTypes) => {
  const Posjetitelj = sequelize.define('posjetitelj', {
    email: DataTypes.STRING,
  });

  Posjetitelj.associate = models => {
    Posjetitelj.belongsTo(models.Osoba);
  };

  return Posjetitelj;
};

export default posjetitelj;
