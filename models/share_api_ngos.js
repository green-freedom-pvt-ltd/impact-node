/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_ngos', {
    ngo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ngo_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    established_year: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    total_registered_volunteers: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    impacted_persons: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    impact_quotient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ngo_photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false
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
    date_signed_in: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    ngo_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_ngocategory',
        key: 'ngo_category_id'
      }
    }
  }, {
    tableName: 'share_api_ngos'
  });
};
