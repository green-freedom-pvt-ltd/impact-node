/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('silk_request', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    query_params: {
      type: DataTypes.TEXT,
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
    method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    view_name: {
      type: DataTypes.STRING,
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
    encoded_headers: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    meta_time: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    meta_num_queries: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    meta_time_spent_queries: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    pyprofile: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    num_sql_queries: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prof_file: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'silk_request'
  });
};
