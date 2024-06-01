module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define("Responses", {
    responseId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
  }, {
    timestamps: true,
    createdAt: 'submitted_at',
    updatedAt: false,
  });

  Responses.associate = (models) => {
    Responses.belongsTo(models.Surveys, { foreignKey: 'surveyId' });
    Responses.belongsTo(models.Users, { foreignKey: 'userId' });
    Responses.hasMany(models.Answers, { foreignKey: 'responseId' });
  };

  return Responses;
};
