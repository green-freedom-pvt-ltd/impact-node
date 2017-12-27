/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_messagecenter', {
    message_center_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    message_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    message_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    message_share_template: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message_brief: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message_video: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'share_api_messagecenter'
  });
};
