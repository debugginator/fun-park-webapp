const stand = (sequelize, DataTypes) => {
  const Stand = sequelize.define('stand', {
    naziv: DataTypes.STRING,
    cjenik: DataTypes.STRING,
  });

  Stand.associate = models => {
    Stand.belongsTo(models.Atrakcija);
  };

  return Stand;
};

export default stand;
