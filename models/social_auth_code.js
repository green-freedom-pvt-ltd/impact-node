/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('social_auth_code', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'social_auth_code'
  });
};
