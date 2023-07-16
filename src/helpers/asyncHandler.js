// middleware handle error
const asynHandler = (func) => {
    return Promise
        .resolve(func)
        .catch((err) => next(err));
}


module.exports = asynHandler;