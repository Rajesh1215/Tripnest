module.exports = (sequelize, DataTypes) => {
  const trip_shares = sequelize.define('trip_shares', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'Username',
      },
    },
    TripID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'TripID',
      },
    },
  });

  // Define associations
  trip_shares.associate = (models) => {
    // Associate the trip_shares model with the users model
    trip_shares.belongsTo(models.users, {
      foreignKey: 'username',
      as: 'user', // Alias for the user association
    });

    // Associate the trip_shares model with the trips model
    trip_shares.belongsTo(models.trips, {
      foreignKey: 'TripID',
      as: 'trip', // Alias for the trip association
    });
  };

  return trip_shares;
};
