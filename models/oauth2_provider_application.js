/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth2_provider_application', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    redirect_uris: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorization_grant_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client_secret: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_users',
        key: 'user_id'
      }
    },
    skip_authorization: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'oauth2_provider_application'
  });
};
