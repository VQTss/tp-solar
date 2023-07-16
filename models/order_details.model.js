const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const OrderDetails = sequelize.define("order_details", {
        order_details_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        products: {
            type: DataTypes.JSONB,
            allowNull: false
        },

    });
    
    
    OrderDetails.associate = (models) => {
        OrderDetails.belongsTo(models.order, { foreignKey: 'order_id' });
       
    };

    return OrderDetails;
};