module.exports = (sequelize, DataTypes) => {
  const favouriteplaces = sequelize.define('favouriteplaces', {
    // Define your table fields and their data types here
    placeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Define associations
  favouriteplaces.associate = (models) => {
    // Define associations with the 'places' and 'users' models
    favouriteplaces.belongsTo(models.places, {
      foreignKey: 'placeid',
      as: 'place', // Alias for the 'places' association
      onDelete: 'CASCADE', // Cascade delete when a place is deleted
    });
    favouriteplaces.belongsTo(models.users, {
      foreignKey: 'username',
      as: 'user', // Alias for the 'users' association
      onDelete: 'CASCADE', // Cascade delete when a user is deleted
    });
  };

  // Define a composite (grouped) primary key
  favouriteplaces.primaryKey = ['placeid', 'username'];

  return favouriteplaces;
};
