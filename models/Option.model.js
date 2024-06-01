module.exports = (sequelize, DataTypes) => {
  const Options = sequelize.define("Options", {
    optionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    option_text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Options.associate = (models) => {
    Options.belongsTo(models.Questions, { foreignKey: 'questionId' });
  };

  return Options;
};
