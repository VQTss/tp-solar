const app = require('./src/app');

const db = require("./models");

const PORT = process.env.PORT || 3000;


db.sequelize.sync().then((result) => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT} and localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
