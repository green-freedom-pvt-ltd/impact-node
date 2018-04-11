/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('share_api_fraudsters', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    client_run_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    usain_bolt_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mock_location_used: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    cause_id_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_causes',
        key: 'cause_id'
      }
    },
    team_id_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_team',
        key: 'id'
      }
    },
    user_id_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_users',
        key: 'user_id'
      }
    }
  }, {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    }, {
      tableName: 'share_api_fraudsters'
    });
};
