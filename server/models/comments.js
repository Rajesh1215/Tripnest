module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define('comments', {
      
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
      commentbody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Define 'username' as a foreign key
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'users', // Assuming 'Users' is the name of the User model
          key: 'Username', // Assuming 'username' is the primary key in the User model
        },
      },
      placeid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'places', // Assuming 'Users' is the name of the User model
          key: 'id', // Assuming 'username' is the primary key in the User model
        },
      },

    });
    
    comments.associate = (models) => {
      comments.belongsTo(models.users, {
        foreignKey: 'username',
        as: 'user',
        onDelete: 'CASCADE', // Add this line for cascade delete
      });
      comments.belongsTo(models.places, {
        foreignKey: 'placeid', // Field in interactions that references places
        as: 'place', // Alias for the place association
      });
    };
    return comments;
  };
  