/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_team', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    team_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    team_captain: {
      type: DataTypes.STRING,
      allowNull: true
    },
    team_captain_email_id: {
      type: DataTypes.STRING,
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
    invisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    team_captain_phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'share_api_team'
  });
};
