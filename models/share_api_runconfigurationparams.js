/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_runconfigurationparams', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CONFIG_NAME: {
      type: DataTypes.STRING,
      allowNull: true
    },
    STEPS_PER_SECOND_FACTOR: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    SOURCE_ACCEPTABLE_ACCURACY: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    THRESHOLD_ACCURACY: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    THRESHOLD_FACTOR: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    SMALLEST_DISPLACEMENT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    TOO_SLOW_CHECK: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    LAZY_ASS_CHECK: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    USAIN_BOLT_CHECK: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ACTIVITY_RECOGNITION_RESULT_HISTORY_QUEUE_MAX_SIZE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    BAD_GPS_NOTIF_THRESHOLD_INTERVAL: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    CONFIDENCE_LOWER_THRESHOLD_STILL: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CONFIDENCE_THRESHOLD_ON_FOOT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CONFIDENCE_THRESHOLD_VEHICLE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CONFIDENCE_THRESHOLD_WALK_ENGAGEMENT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CONFIDENCE_UPPER_THRESHOLD_STILL: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    DATA_SYNC_INTERVAL: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    DATA_SYNC_INTERVAL_FLEX: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    DETECTED_INTERVAL_ACTIVE: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    DETECTED_INTERVAL_IDLE: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    DIST_INC_IN_SINGLE_GPS_UPDATE_UPPER_LIMIT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    GPS_INACTIVITY_NOTIFICATION_DELAY: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    MIN_CADENCE_FOR_WALK: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    MIN_DISPLACEMENT_FOR_WORKOUT_UPDATE_EVENT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    SECONDARY_SPIKE_FILTER_SPEED_THRESHOLD_DEFAULT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    SPIKE_FILTER_SPEED_THRESHOLD_DEFAULT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    SPIKE_FILTER_SPEED_THRESHOLD_IN_VEHICLE: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    SPIKE_FILTER_SPEED_THRESHOLD_ON_FOOT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    STILL_NOTIFICATION_DISPLAY_INTERVAL: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    USAIN_BOLT_GPS_SPEED_LIMIT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    USAIN_BOLT_RECENT_SPEED_LOWER_BOUND: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    USAIN_BOLT_UPPER_SPEED_LIMIT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    USAIN_BOLT_UPPER_SPEED_LIMIT_ON_FOOT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    USAIN_BOLT_WAIVER_STEPS_RATIO: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    VIGILANCE_TIMER_INTERVAL: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    WALK_ENGAGEMENT_COUNTER_INTERVAL: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    WALK_ENGAGEMENT_NOTIFICATION_INTERVAL: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    WALK_ENGAGEMENT_NOTIFICATION_THROTTLE_PERIOD: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    ACCEPTABLE_AVERAGE_SPEED_LOWER_LIMIT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    ACCEPTABLE_AVERAGE_SPEED_UPPER_LIMIT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    CONFIDENCE_THRESHOLD_ON_CYCLE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    GLOBAL_AVERAGE_STRIDE_LENGTH: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    GLOBAL_STRIDE_LENGTH_LOWER_LIMIT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    GLOBAL_STRIDE_LENGTH_UPPER_LIMIT: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    GOOGLE_FIT_SENSOR_TRACKER_SAMPLING_RATE: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LOCATION_UPDATE_INTERVAL: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MIN_INTERVAL_FOR_DISTANCE_NORMALISATION: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'share_api_runconfigurationparams'
  });
};
