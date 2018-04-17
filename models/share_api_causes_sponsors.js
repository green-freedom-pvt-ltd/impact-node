/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_causes_sponsors', {
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
    sponsors_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_sponsors',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
    timestamps:false     
  }, 
  {
    tableName: 'share_api_causes_sponsors'
  });
};
