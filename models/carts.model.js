module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
        } ,
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    });
    Cart.associate = (models) => {
        Cart.belongsTo(models.product, {
            foreignKey: 'product_id',
            targetKey: 'product_id',
            as: 'product',
        });
        Cart.belongsTo(models.user, {
            foreignKey: 'user_id',
            as: 'user',
        });
    }

    return Cart;
};