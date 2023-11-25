module.exports= (sequelize,DataTypes)=>{
    const interactions=sequelize.define('interactions',{ 
        
          Username: {
            type: DataTypes.STRING,
            allowNull: false,

          },
          placeid: {
            type: DataTypes.INTEGER,
            allowNull: false,

          },
          
          Rating: {
            type: DataTypes.INTEGER,
            allowNull: true, // Change to false if rating is required
            validate: {
              min: 1,
              max: 5,
            },
          },
          Liked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false, // Default to false, change as needed
          },
    });

    interactions.associate = (models) => {
      // Associate the interactions model with the users model
      interactions.belongsTo(models.users, {
        foreignKey: 'Username', // Field in interactions that references users
        as: 'user', // Alias for the user association
      });
  
      // Associate the interactions model with the places model
      interactions.belongsTo(models.places, {
        foreignKey: 'placeid', // Field in interactions that references places
        as: 'place', // Alias for the place association
      });
    };

    return interactions;
}