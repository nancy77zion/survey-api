module.exports = (sequelize, DataTypes) => {
  const Surveys = sequelize.define("Surveys", {
    surveyId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Surveys.associate = (models) => {
    Surveys.belongsTo(models.Users, { foreignKey: 'userId' });
    Surveys.hasMany(models.Questions, { foreignKey: 'surveyId' });
    Surveys.hasMany(models.Responses, { foreignKey: 'surveyId' });
  };

  return Surveys;
};
