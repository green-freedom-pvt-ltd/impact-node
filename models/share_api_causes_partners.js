/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_causes_partners', {
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
    partners_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_partners',
        key: 'id'
      }
    }
  }, {
    tableName: 'share_api_causes_partners'
  });
};
