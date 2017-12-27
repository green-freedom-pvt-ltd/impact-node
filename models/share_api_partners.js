/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_partners', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    partner_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    partnered_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    partner_company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_company',
        key: 'company_id'
      }
    },
    partner_ngo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_ngos',
        key: 'ngo_id'
      }
    },
    partner_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_partnertype',
        key: 'id'
      }
    }
  }, {
    tableName: 'share_api_partners'
  });
};
