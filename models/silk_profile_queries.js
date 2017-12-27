/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('silk_profile_queries', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'silk_profile',
        key: 'id'
      },
      unique: true
    },
    sqlquery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'silk_sqlquery',
        key: 'id'
      }
    }
  }, {
    tableName: 'silk_profile_queries'
  });
};
