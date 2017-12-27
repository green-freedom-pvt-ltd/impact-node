/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_partnertype', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    partner_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    partner_type_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'share_api_partnertype'
  });
};
