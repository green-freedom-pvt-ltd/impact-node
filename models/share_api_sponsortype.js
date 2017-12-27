/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_sponsortype', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sponsor_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sponsor_type_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'share_api_sponsortype'
  });
};
