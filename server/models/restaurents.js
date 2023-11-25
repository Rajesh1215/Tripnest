module.exports = (sequelize, DataTypes) => {
    const restaurents = sequelize.define('restaurents', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      items: {
        type: DataTypes.JSON, // Use ARRAY for an array of strings
        allowNull: false,
      },
      priceRange: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.JSON, // Use JSONB for JSON data
        allowNull: false,
      },
      residenceNights: {
        type: DataTypes.BOOLEAN, // Use BOOLEAN for true/false values
        allowNull: false,
      },
    });
  
    return restaurents;
  };
  