/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_campaign', {
    campaign_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    campaign_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    campaign_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    campaign_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    button_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    campaign_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    campaign_share_template: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    show_on_sign_up: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_always: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    partner_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_ngos',
        key: 'ngo_id'
      }
    },
    sponsor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_company',
        key: 'company_id'
      }
    }
  }, {
    tableName: 'share_api_campaign'
  });
};
