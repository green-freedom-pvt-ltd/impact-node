/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oauth2_provider_grant', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    redirect_uri: {
      type: DataTypes.STRING,
      allowNull: false
    },
    scope: {
      type: DataTypes.TEXT,
      allowNull: false
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
    tableName: 'oauth2_provider_grant'
  });
};
