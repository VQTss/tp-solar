module.exports = (sequelize, DataTypes) => {
    const SliderImage = sequelize.define("slider_image", {
        slider_image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        slider_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Slider name cannot be null" },
                notEmpty: { msg: "Slider name cannot be empty" },
            }
        },
        slider_image: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: { msg: "Slider image cannot be null" },
                notEmpty: { msg: "Slider image cannot be empty" },
            },
        },
        image_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            validate: {
                notNull: { msg: "Image status cannot be null" },
                notEmpty: { msg: "Image status cannot be empty" },
            },
        }
    });
    return SliderImage;
}