/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('share_api_impactleague', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    impactleague_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_company',
        key: 'company_id'
      }
    },
    impactleague_banner: {
      type: DataTypes.STRING,
      allowNull: true
    },
    team_size: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    email_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    impactleague_banner_site: {
      type: DataTypes.STRING,
      allowNull: true
    },
    impactleague_description_site: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    module: {
      type: DataTypes.STRING,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    allow_all_cause: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    show_team_logo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    }, {
      tableName: 'share_api_impactleague'
    });
};
