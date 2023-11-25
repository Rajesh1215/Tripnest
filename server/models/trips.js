module.exports = (sequelize, DataTypes) => {
  const trips = sequelize.define('trips', {
    TripID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define other fields for the Trip table

    // Define a foreign key for the username
    username: {
      type: DataTypes.STRING, // Assuming username is a string
      allowNull: false,
      references: {
        model: 'users', // The name of the referenced table (change to match your actual user table name)
        key: 'Username', // The name of the referenced column (change to match your actual user column name)
      },
    },

    // Define a JSON column for places
    places: {
      type: DataTypes.JSON, // Use JSONB for JSON arrays (or DataTypes.JSON for non-binary JSON)
      allowNull: false, // Set allowNull to true or false based on your requirements
    },
    images:{
      type:DataTypes.JSON,
      allowNull:false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  trips.associate = (models) => {
    // Associate the trips model with the users model
    trips.belongsTo(models.users, {
      foreignKey: 'username', // Field in trips that references users
      as: 'user', // Alias for the user association
    });
  };
  

  return trips;
};
