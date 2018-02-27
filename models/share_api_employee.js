
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('share_api_employee', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'share_api_city',
          key: 'id'
        }
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'share_api_company',
          key: 'company_id'
        }
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'share_api_department',
          key: 'id'
        }
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'share_api_team',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'share_api_users',
          key: 'user_id'
        },
        unique: true
      },
      is_logout: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      date_registered: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    },{
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps:false     
      }, 
    
    {
      tableName: 'share_api_employee'
    });
  };