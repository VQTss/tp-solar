module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
        "Payment", 
        {
            payment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            payment_method: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            payment_status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            payment_date: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
            },
            order_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }
    );
    Payment.associate = (models) => {
        Payment.belongsTo(models.order, {
            foreignKey: 'order_id',
            targetKey: 'order_id',
        });
        Payment.belongsTo(models.user, {
            foreignKey: 'user_id',
            targetKey: 'id',
        });
    };
    return Payment;
};