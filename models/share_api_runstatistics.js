/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_runstatistics', {
    run_statistics_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    total_distance: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    total_amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    total_duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_spikes: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    zero_spikes: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    total_steps: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    zero_steps: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    run_count: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    user_count: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    new_users: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    league_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cause_run_title_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    }
  }, {
    tableName: 'share_api_runstatistics'
  });
};
