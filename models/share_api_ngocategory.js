/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_ngocategory', {
    ngo_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ngo_category_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ngo_sector: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'share_api_ngocategory'
  });
};
