const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// var url = {
//     "localhost": "mongodb://localhost:27017/MongooseTodoApp",
//     "Mlab": "mongodb://ashish:ashish@ds221148.mlab.com:21148/ashishtodo"
// }
var URL =
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/MongooseTodoApp');
module.exports = {
    mongoose
}