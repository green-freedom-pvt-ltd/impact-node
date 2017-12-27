/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_volunteers', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    is_registered: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    has_attended: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    impact_score: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    events_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_events',
        key: 'events_id'
      }
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_users',
        key: 'user_id'
      }
    }
  }, {
    tableName: 'share_api_volunteers'
  });
};
