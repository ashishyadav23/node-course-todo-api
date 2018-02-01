const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
var url = {
    "localhost": "mongodb://localhost:27017/MongooseTodoApp",
    "Mlab": "mongodb://<ashishyadav23>:<ashish23>@ds221148.mlab.com:21148/ashishtodo"
}
var URL =
    mongoose.connect(url.Mlab||url.localhost);
module.exports = {
    mongoose
}