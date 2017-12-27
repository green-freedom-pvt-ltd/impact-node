/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('silk_response', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    status_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    raw_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    encoded_headers: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    request_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'silk_request',
        key: 'id'
      },
      unique: true
    }
  }, {
    tableName: 'silk_response'
  });
};
