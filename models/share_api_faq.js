/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_faq', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_id_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_api_users',
        key: 'user_id'
      }
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'share_api_faq'
  });
};
