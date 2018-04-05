module.exports = function (sequelize, DataTypes) {
    return sequelize.define('share_api_teamleaderboard', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
              }
        },
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        run_count: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
       
    },
        {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false
        },
        {
            tableName: 'share_api_teamleaderboard'
        });
};