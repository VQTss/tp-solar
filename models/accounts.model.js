
module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("account", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: "Username cannot be null" },
                notEmpty: { msg: "Username cannot be empty" },
                len: {
                    args: [3, 20],
                    msg: "Username must be between 3 and 20 characters",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Password cannot be null" },
                notEmpty: { msg: "Password cannot be empty" },
               
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: { msg: "Email cannot be null" },
                notEmpty: { msg: "Email cannot be empty" },
                isEmail: { msg: "Email must be a valid email" },
            },
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user",
            validate: {
                notNull: { msg: "Role cannot be null" },
                notEmpty: { msg: "Role cannot be empty" },
                isIn: {
                    args: [["user", "admin"]],
                    msg: "Role must be either 'user' or 'admin'",
                },
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: "User ID cannot be null" },
                notEmpty: { msg: "User ID cannot be empty" },
                isInt: { msg: "User ID must be an integer" },
                min: { args: [0], msg: "User ID must be greater than 0" },
            },
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,

        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notNull: { msg: "isAdmin cannot be null" },
                notEmpty: { msg: "isAdmin cannot be empty" },
            },
        },
    });
    Account.associate = (models) => {
        Account.belongsTo(models.user, {
            foreignKey: "user_id",
            targetKey: "id",
        });
    };
    return Account;
}