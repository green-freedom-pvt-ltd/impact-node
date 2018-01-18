/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('share_api_runlocations', {
        run_location_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        client_run_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        batch_num: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        start_time_epoch: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        end_time_epoch: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        location_array: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        run_id_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'share_api_runs',
                key: 'run_id'
            }
        }
    }, {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false
        },

        {
            tableName: 'share_api_runlocations'
        });
};