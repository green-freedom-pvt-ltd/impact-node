/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_sponsors', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sponsor_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sponsor_logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    partnered_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sponsor_company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_company',
        key: 'company_id'
      }
    },
    sponsor_ngo_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_ngos',
        key: 'ngo_id'
      }
    },
    sponsor_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_sponsortype',
        key: 'id'
      }
    }
  }, {
    tableName: 'share_api_sponsors'
  });
};
