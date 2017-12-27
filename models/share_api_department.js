/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_department', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'share_api_department'
  });
};
