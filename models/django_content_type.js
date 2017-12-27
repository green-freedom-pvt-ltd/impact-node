/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('django_content_type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    app_label: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'django_content_type'
  });
};
