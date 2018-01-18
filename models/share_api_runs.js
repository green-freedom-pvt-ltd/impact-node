module.exports = function(sequelize, DataTypes) {
    return sequelize.define('share_api_runs', {
      run_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      start_location_lat: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      start_location_long: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      avg_speed: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      end_location_lat: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      end_location_long: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      distance: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      peak_speed: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      calories_burnt: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      cause_run_title_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'share_api_causes',
          key: 'cause_id'
        }
      },
      user_id_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'share_api_users',
          key: 'user_id'
        }
      },
      run_amount: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      run_duration: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      no_of_steps: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      is_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      is_ios: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      client_run_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      version: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      end_time_epoch: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      run_duration_epoch: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      start_time_epoch: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      team_id_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'share_api_team',
          key: 'id'
        }
      },
      num_spikes: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      app_version: {
        type: DataTypes.STRING,
        allowNull: true
      },
      device_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      device_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      num_updates: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      os_version: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cause_id_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'share_api_causes',
          key: 'cause_id'
        }
      }
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    }, 
    {
      tableName: 'share_api_runs'
    });
  };