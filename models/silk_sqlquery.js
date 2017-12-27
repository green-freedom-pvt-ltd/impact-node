/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('silk_sqlquery', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    query: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    time_taken: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    traceback: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    request_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'silk_request',
        key: 'id'
      }
    }
  }, {
    tableName: 'silk_sqlquery'
  });
};
