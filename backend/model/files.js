module.exports = (sequelize, DataTypes) => {
  const Files = sequelize.define('files', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    entry_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    entry_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'document',
    timestamps: false
  });

  return Files;
};
