/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('share_api_city', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps:false     
    },
    {
      tableName: 'share_api_city'
    });
};
