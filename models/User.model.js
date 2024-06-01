module.exports = (sequelize, DataTypes) => {
  
  const Users = sequelize.define("Users", { 
    userId: {
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    tokenExpire: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

Users.associate = (models) => {
  Users.hasMany(models.Surveys, { foreignKey: 'userId' });
  Users.hasMany(models.Responses, { foreignKey: 'userId' });
};

  return Users
}