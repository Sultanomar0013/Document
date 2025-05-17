module.exports = (sequelize, DataTypes) => {
  const AccessDoc = sequelize.define('AccessDoc', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    doc_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'File(0) OR Folder(1)'
    },
    access_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    access_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    access_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    access_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'access_doc',
    timestamps: false
  });

  return AccessDoc;
};
