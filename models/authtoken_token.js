/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authtoken_token', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'authtoken_token'
  });
};
