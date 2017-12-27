/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('social_auth_association', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    server_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issued: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lifetime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    assoc_type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'social_auth_association'
  });
};
