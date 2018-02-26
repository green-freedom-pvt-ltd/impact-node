/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_appupdate', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    app_version: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    force_update: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    recommend_upgrade: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    update_text_message: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'share_api_appupdate'
  });
};
