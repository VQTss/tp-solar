const { HEADER} = require("./../utils/constants/index");
const { BadRequestError } = require("../core/error.response");

const apiKey = async (req, res, next) => {
    const appKey = req.headers[HEADER.API_KEY]?.toString();
    const appID = req.headers[HEADER.API_ID]?.toString();
    if (!appKey) {
        return res.status(400).json({
            message: "Error: App Key is not in header"
        });
    }
    if (!appID) {
        return res.status(400).json({
            message: "Error: App ID is not in header"
        });
    }

    if (appKey !== process.env.API_KEY && appID !== process.env.API_ID) {
        return res.status(400).json({
            message : "You do not have permission to access this app (appKey and appID)!!!"
        });
       
    }

    const objKey = {
        appKey,
        appID
    }
    req.objKey = objKey;
    return next();
}

module.exports = {
    apiKey
}