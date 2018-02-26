/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('social_auth_usersocialauth', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    extra_data: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'social_auth_usersocialauth'
  });
};
