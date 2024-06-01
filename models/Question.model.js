module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    questionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    question_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    question_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Questions.associate = (models) => {
    Questions.belongsTo(models.Surveys, { foreignKey: 'surveyId' });
    Questions.hasMany(models.Options, { foreignKey: 'questionId' });
  };

  return Questions;
};
