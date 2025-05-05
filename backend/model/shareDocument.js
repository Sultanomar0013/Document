module.exports = (sequelize, DataTypes) => {
  const ShareDocument = sequelize.define('ShareDocument', {
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
      allowNull: false
    },
    share_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entry_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entry_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'share_document',
    timestamps: false
  });

  return ShareDocument;
};
