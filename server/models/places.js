module.exports = (sequelize, DataTypes) => {
    const places = sequelize.define('places', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING, // Assuming 'name' is a string
        allowNull: false,
      },
      location: {
        type: DataTypes.JSON, // Store the 'location' as JSON
        allowNull: false,
      },
      images:{
        type:DataTypes.JSON,
        allowNull:false,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      spending: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT, // Assuming 'rating' is a floating-point number
        allowNull: false,
      },
      activities: {
        type: DataTypes.JSON, // Store 'activities' as JSON
        allowNull: false,
      },
      genres: {
        type: DataTypes.JSON, // Store 'genres' as JSON
        allowNull: false,
      },
    });
  
    return places;
  };
  