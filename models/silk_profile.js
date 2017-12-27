/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('silk_profile', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    time_taken: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    line_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    end_line_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    func_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    exception_raised: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dynamic: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'silk_profile'
  });
};
