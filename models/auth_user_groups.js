/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_user_groups', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'auth_group',
        key: 'id'
      }
    }
  }, {
    tableName: 'auth_user_groups'
  });
};
