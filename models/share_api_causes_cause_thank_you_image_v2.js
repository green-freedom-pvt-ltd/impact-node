/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_causes_cause_thank_you_image_v2', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    causes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_causes',
        key: 'cause_id'
      },
      unique: true
    },
    causethankyouimage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_causethankyouimage',
        key: 'id'
      }
    }
  }, {
    tableName: 'share_api_causes_cause_thank_you_image_v2'
  });
};
