/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_users', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender_user: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locality_user: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_signed_in: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    latitude_user: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    longitude_user: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    is_volunteer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    total_distance: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_joined: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_staff: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_superuser: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    social_thumb: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cheat_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    body_height: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    body_weight: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, 
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      timestamps:false     
    },
    {
    tableName: 'share_api_users'
  });
};