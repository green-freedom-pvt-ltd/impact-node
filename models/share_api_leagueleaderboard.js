/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('share_api_leagueleaderboard', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_team',
        key: 'id'
      }
    },
    total_team_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    team_run_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    },
    total_team_distance: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: '0'
    }
  },

    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    },
    {
      tableName: 'share_api_leagueleaderboard'
    });
};
