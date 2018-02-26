/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_causethankyouimage', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cause_thank_you_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cause_thank_you_title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'share_api_causethankyouimage'
  });
};
