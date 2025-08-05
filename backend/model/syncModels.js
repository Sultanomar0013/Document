const sequelize = require('./db'); // Import the Sequelize instance
const { DataTypes } = require('sequelize');

require('./accessDoc')(sequelize, DataTypes);
require('./category')(sequelize, DataTypes);
require('./docDir')(sequelize, DataTypes);
require('./file')(sequelize, DataTypes);
require('./folderInfo')(sequelize, DataTypes);
require('./shareDocument')(sequelize, DataTypes);



const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
  } catch (err) {
    console.error('Database sync error:', err);
  }
};

module.exports = syncDatabase;