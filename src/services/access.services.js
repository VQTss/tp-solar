

const model = require('../../models/index');
const Account = model.account;
const User = model.user;
const bcrypt = require('bcrypt');
const { NotFoundError, BadRequestError } = require('../core/error.response');
const { getInforData } = require('../utils');
const jwt = require('jsonwebtoken');
const { SuccessResponse } = require('../core/success.response');

const AccessServices = {

    // GENERATE ACCESS TOKEN
    generateAccessToken: (payload) => {
        return jwt.sign({
            id: payload.id,
            admin: payload.admin
        },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "2h"
            }
        );
    },

    // GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign({ // giá trị lưu trữ trong payload
            id: user.id,
            admin: user.admin
        },
            process.env.REFRESH_TOKEN, // sceret key
            { expiresIn: "7d" } // ngày hết hạn
        );
    },

    registerUser: async (username, email, password, inforUser) => {

        try {
            const user = await User.create({
                full_name: inforUser.full_name,
                phone: inforUser.phone,
                address: inforUser.address,
            });
            if (!user) {
                return new NotFoundError("User not register");
            }
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            const stringPasss = await hashed.toString();
            const account = await Account.create({
                username: username,
                password: stringPasss,
                email: email,
                user_id: user.id
            });
            const data = getInforData({ fileds: ["id", "username", "email", "role", "user_id"], object: account });
            return data;

        } catch (error) {
            return error.parent;    
        }
    },


    login: async (username, password) => {
        const account = await Account.findOne({
            where: {
                username: username
            }
        })
        if (!account) {
            return new NotFoundError("Username wrong");
        }
        const validPassword = await bcrypt.compare(password, account.password);
        if (!validPassword) {
            return new NotFoundError("Password wrong");
        }
        const payload = {
            id: account.id,
            admin: account.role === "admin" ? true : false
        }
        const accessToken = AccessServices.generateAccessToken(payload);
        const refreshToken = AccessServices.generateRefreshToken(payload);
        account.accessToken = accessToken;
        account.refreshToken = refreshToken;
        await account.save();
        const data = getInforData({ fileds: ["id", "username", "email", "role", "user_id"], object: account });
        data.accessToken = accessToken;
        data.refreshToken = refreshToken;
        return data;
    },
    logout: async (refreshToken) => {
        const account = await Account.findOne({
            where: {
                refreshToken: refreshToken
            }
        })
        // chỉ có đăng nhập mới có refreshToken  và accessToken
        account.refreshToken = null;
        account.accessToken = null;
        await account.save();
        return account;
    },
    requestRefreshToken: async (refreshToken) => {
        let data = null;
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) {
                return new BadRequestError("Refresh token wrong");
            }
            data = user;
        });
        
        if (data === null) {
            return new BadRequestError("Refresh token wrong");
        }
        
        const account = await Account.findOne({
            where: {
                id: data.id
            }
        })
        

        const newAccessToken = AccessServices.generateAccessToken(data);
        const newRefreshToken = AccessServices.generateRefreshToken(data);
        account.accessToken = newAccessToken;
        account.refreshToken = newRefreshToken;
        await account.save();
        const result = getInforData({ fileds: ["accessToken", "refreshToken"], object: account });
        return result;
    } 
};

module.exports = AccessServices;