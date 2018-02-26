/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('share_api_events', {
    events_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_the_event: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    event_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_volunteers_expected: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    no_volunteers_turned_up: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    email_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locality_events: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_registered: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    latitude_event: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    longitude_event: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_company',
        key: 'company_id'
      }
    },
    event_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_eventcategory',
        key: 'event_category_id'
      }
    },
    ngo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'share_api_ngos',
        key: 'ngo_id'
      }
    }
  }, {
    tableName: 'share_api_events'
  });
};
