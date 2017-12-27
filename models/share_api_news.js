/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_news', {
    news_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    headline: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    pub_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    crisp_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    creator_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    curator_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source_content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source_link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    source_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'share_api_news'
  });
};
