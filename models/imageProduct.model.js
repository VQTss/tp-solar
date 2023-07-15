module.exports = (sequelize, DataTypes) => {
    const ImageProduct = sequelize.define("image_product", {
        image_name : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Image name cannot be null" },
                notEmpty: { msg: "Image name cannot be empty" },
                len: {
                    args: [3, 50],
                    msg: "Image name must be between 3 and 50 characters",
                },
        }
    },
        image_base64 : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Image base64 cannot be null" },
                notEmpty: { msg: "Image base64 cannot be empty" },
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
    ImageProduct.associate = (models) => {
        ImageProduct.belongsTo(models.product, {
            foreignKey: "product_id",
            as: "product",
        });
    };
    return ImageProduct;
}