module.exports = function (sequelize, DataTypes) {
   
    return sequelize.define('leaderboard_activity', {
        leaderboard_activity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: 'share_api_users',
                key: 'user_id'
              }
        },
        team_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        dist_agg: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        amt_agg: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        walk_dist_agg: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        walk_amt_agg: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        run_dist_agg: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        run_amt_agg: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        super_dist_agg: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        super_amt_agg: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        dist_7: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        amt_7: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        walk_dist_7: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        walk_amt_7: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        run_dist_7: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        run_amt_7: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        super_dist_7: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        super_amt_7: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        dist_30: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        amt_30: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        walk_dist_30: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        walk_amt_30: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        run_dist_30: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        run_amt_30: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        super_dist_30: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        super_amt_30: {
            type: DataTypes.DOUBLE,
            allowNull: true
        }
    },
        {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false,
            // underscored: true 
        },
        {
            tableName: 'leaderboard_activity',
           
        });
};

