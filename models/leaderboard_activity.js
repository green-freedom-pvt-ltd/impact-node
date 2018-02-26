/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leaderboard_activity', {
    leaderboard_activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(leaderboard_activity_leaderboard_activity_id_seq::regclass)'
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    team_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    run_count: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0'
    },
    dist_agg: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    amt_agg: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    walk_dist_agg: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    walk_amt_agg: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    run_dist_agg: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    run_amt_agg: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    super_dist_agg: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    super_amt_agg: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    dist_7: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    amt_7: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    walk_dist_7: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    walk_amt_7: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    run_dist_7: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    run_amt_7: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    super_dist_7: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    super_amt_7: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    dist_30: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    amt_30: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    walk_dist_30: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    walk_amt_30: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    run_dist_30: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    run_amt_30: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    super_dist_30: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    },
    super_amt_30: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'leaderboard_activity'
  });
};
