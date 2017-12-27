/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_users_groups', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_users',
        key: 'user_id'
      },
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
    tableName: 'share_api_users_groups'
  });
};
