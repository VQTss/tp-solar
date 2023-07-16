module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        },
        order_status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        order_total: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        address : {
            type: Sequelize.STRING,
            allowNull: false
        },
       
        phone : {
            type: Sequelize.STRING,
            allowNull: false
        },
        email : {
            type: Sequelize.STRING,
            allowNull: false
        },
        name : {
            type: Sequelize.STRING,
            allowNull: false
        }

    });
    Order.associate = (models) => {
        Order.hasMany(models.order_details, { foreignKey: 'order_id' });
        Order.belongsTo(models.user, { foreignKey: 'user_id' });
    };
    return Order;

};