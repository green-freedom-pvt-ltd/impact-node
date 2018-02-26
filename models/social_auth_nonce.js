/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('social_auth_nonce', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    server_url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    timestamp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'social_auth_nonce'
  });
};
