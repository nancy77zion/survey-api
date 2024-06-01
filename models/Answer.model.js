module.exports = (sequelize, DataTypes) => {
  const Answers = sequelize.define("Answers", {
    answerId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    answer_text: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Answers.associate = (models) => {
    Answers.belongsTo(models.Responses, { foreignKey: 'responseId' });
    Answers.belongsTo(models.Questions, { foreignKey: 'questionId' });
    Answers.belongsTo(models.Options, { foreignKey: 'optionId' });
  };

  return Answers;
};
