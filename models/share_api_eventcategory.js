/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_eventcategory', {
    event_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_sector: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'share_api_eventcategory'
  });
};
