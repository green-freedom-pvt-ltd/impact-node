/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_enquire', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'share_api_enquire'
  });
};
