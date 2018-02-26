/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_causes', {
    cause_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cause_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cause_brief: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cause_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cause_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    conversion_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    cause_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_causescategory',
        key: 'cause_category_id'
      }
    },
    cause_share_message_template: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cause_thank_you_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    min_distance: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    app_update_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_appupdate',
        key: 'id'
      }
    },
    cause_completed_description_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cause_completed_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cause_completed_share_message_template: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    cause_completed_report: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'share_api_causes'
  });
};
