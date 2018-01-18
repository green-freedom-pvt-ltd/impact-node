/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('share_api_userfeedback', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        feedback: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_id_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'share_api_users',
                key: 'user_id'
            }
        },
        feedback_added: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        client_run_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        run_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_chat: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        sub_tag: {
            type: DataTypes.STRING,
            allowNull: true
        },
        client_time_stamp: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        feedback_app_version: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_ios: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
        {

            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false
        },
        {
            tableName: 'share_api_userfeedback'
        });
};