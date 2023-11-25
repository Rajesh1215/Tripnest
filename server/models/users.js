module.exports= (sequelize,DataTypes)=>{
    const users=sequelize.define('users',{
  // Define your table fields and their data types here
  
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add more fields as needed
    });
    return users;

}
