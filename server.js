const app = require('./src/app');

const db = require("./models");

const PORT = process.env.PORT || 3000;
const https = require('https');
var fs = require('fs');
const path = require('path');

var options = {
    key: fs.readFileSync(path.join(__dirname, '/key/dienphuctruongan.com.key')),
    cert: fs.readFileSync(path.join(__dirname, '/key/dienphuctruongan_com.crt'))
};
//./key/PUBLIC_KEY.pem
db.sequelize.sync().then((result) => {
    // app.listen(PORT, () => {
    //     console.log(`Server listening on port ${PORT} and localhost:${PORT}`);
    // });
    https.createServer(options, app).listen(3000);
}).catch((err) => {
    console.log(err);
});
