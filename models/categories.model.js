module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Category name cannot be null" },
                notEmpty: { msg: "Category name cannot be empty" },
                len: {
                    args: [3, 50],
                    msg: "Category name must be between 3 and 50 characters",
                },
            },
        },
    });
    Category.associate = (models) => {
        Category.hasMany(models.product, {
            foreignKey: "category_id",
            as: "products",
        });
    };
    return Category;
}