module.exports = (sequelize, DataTypes) => {
    const DescProduct = sequelize.define("desc_product", {
        desc : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Description cannot be null" },
                notEmpty: { msg: "Description cannot be empty" },
            },
        },
        product_id : {
            type: DataTypes.STRING,
            foreignKey: true,
            reference : {
                model : "product",
                key : "product_id"
            },
            allowNull: false,
            validate: {
                notNull: { msg: "Product ID cannot be null" },
                notEmpty: { msg: "Product ID cannot be empty" },
            },
        }
    });
    DescProduct.associate = (models) => {
        DescProduct.belongsTo(models.product, {
            foreignKey: "product_id",
            as: "product",
        });
    };
    return DescProduct;
}