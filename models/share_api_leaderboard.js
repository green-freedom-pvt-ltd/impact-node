/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('share_api_leaderboard', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    amount_7: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    distance_7: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    amount_30: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    distance_30: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    amount_all: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    distance_all: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    run_count: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    }, {
      tableName: 'share_api_leaderboard'
    });
};
