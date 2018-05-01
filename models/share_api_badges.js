/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('share_api_badges', {
    badge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    badge_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    badge_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    badge_category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stars_count: {
      type: DataTypes.STRING,
      allowNull: true
    },
    badge_image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description3: {
      type: DataTypes.STRING,
      allowNull: true
    },
    badge_parameter: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps: false
    }, {
      tableName: 'share_api_badges'
    });
};
