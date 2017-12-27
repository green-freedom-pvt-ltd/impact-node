/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_company', {
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    established_year: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locality_ngo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude_company: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    longitude_company: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    date_signed_in: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    company_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_companycategory',
        key: 'company_category_id'
      }
    }
  }, {
    tableName: 'share_api_company'
  });
};
