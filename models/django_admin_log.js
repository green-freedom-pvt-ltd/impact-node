/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('django_admin_log', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    action_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    object_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    object_repr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    action_flag: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    change_message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'django_content_type',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_users',
        key: 'user_id'
      }
    }
  }, {
    tableName: 'django_admin_log'
  });
};
