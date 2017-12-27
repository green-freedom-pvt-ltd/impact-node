/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth2_provider_refreshtoken', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access_token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'oauth2_provider_accesstoken',
        key: 'id'
      },
      unique: true
    },
    application_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'oauth2_provider_application',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_users',
        key: 'user_id'
      }
    }
  }, {
    tableName: 'oauth2_provider_refreshtoken'
  });
};
