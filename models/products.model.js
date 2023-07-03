module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        product_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                notNull: { msg: "Product ID cannot be null" },
                notEmpty: { msg: "Product ID cannot be empty" },
            },
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Product name cannot be null" },
                notEmpty: { msg: "Product name cannot be empty" },
                len: {
                    args: [3, 50],
                    msg: "Product name must be between 3 and 50 characters",
                },
            },
        },
        product_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "Product price cannot be null" },
                notEmpty: { msg: "Product price cannot be empty" },
                isInt: { msg: "Product price must be an integer" },
                min: { args: [0], msg: "Product price must be greater than 0" },
            },
        },
        product_discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notNull: { msg: "Product discount cannot be null" },
                notEmpty: { msg: "Product discount cannot be empty" },
                isInt: { msg: "Product discount must be an integer" },
                min: { args: [0], msg: "Product discount must be greater than 0" },
                max: { args: [100], msg: "Product discount must be less than 100" },
            },
        },
        flash_sale: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notNull: { msg: "Flash sale cannot be null" },
                notEmpty: { msg: "Flash sale cannot be empty" },
                isIn: {
                    args: [[true, false]],
                    msg: "Flash sale must be either 'true' or 'false'",
                },
            },
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "Category ID cannot be null" },
                notEmpty: { msg: "Category ID cannot be empty" },
            },
        },
    
    });
    Product.associate = (models) => {
        Product.belongsTo(models.category, {
            foreignKey: "category_id",
            as: "categories",
        });
    };

    return Product;
}