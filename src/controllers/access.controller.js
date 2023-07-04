const { SuccessResponse } = require("../core/success.response");
const AccessServices = require("../services/access.services");


const AccessToken = {
    login: async (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.json({
                "message": "Username or password is not in body"
            });
        }else{
            const user = await AccessServices.login(username, password);
            // set cookie
            res.cookie("refreshToken", user.refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict"
            })
            new SuccessResponse({
                message: "Login success",
                metadata: user
            }).send(res);
        }
       
    },
    register: async (req, res, next) => {
        const { username, email, password , inforUser } = req.body;
        if (!username || !email || !password) {
            res.json({
                "message": "Username or email or password is not in body"
            });
        }

        if (!inforUser) {
            res.json({
                "message": "InforUser is not in body"
            })
        }else{
            const account = await AccessServices.registerUser(username, email, password, inforUser);
            new SuccessResponse({
                message: "Register success",
                metadata: account
            }).send(res);
        }

    },
    logout: async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        const user = await AccessServices.logout(refreshToken);
        res.clearCookie("refreshToken");
        new SuccessResponse({
            message: "Logout success",
            metadata: user
        }).send(res);
    },
    refreshToken: async (req, res, next) => {
        const refreshToken = req.cookies.refreshToken;
        const user = await AccessServices.requestRefreshToken(refreshToken);
        res.cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        })
        new SuccessResponse({
            message: "Refresh token success",
            metadata: user
        }).send(res);
    }
}

module.exports = AccessToken;