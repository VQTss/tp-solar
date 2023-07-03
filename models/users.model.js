module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Full name cannot be null" },
                notEmpty: { msg: "Full name cannot be empty" },
                len: {
                    args: [3, 50],
                    msg: "Full name must be between 3 and 50 characters",
                },
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Phone cannot be null" },
                notEmpty: { msg: "Phone cannot be empty" },
                len: {
                    args: [10, 10],
                    msg: "Phone must be 10 characters",
                },
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Address cannot be null" },
                notEmpty: { msg: "Address cannot be empty" },
                len: {
                    args: [3, 50],
                    msg: "Address must be between 3 and 50 characters",
                },
            }
        },
        
    });


    
    
    return User;

}