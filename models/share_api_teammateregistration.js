/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_teammateregistration', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    team_mate_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    team_mate_email_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    team_mate_phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    impactleague_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_impactleague',
        key: 'id'
      }
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_team',
        key: 'id'
      }
    }
  }, {
    tableName: 'share_api_teammateregistration'
  });
};
