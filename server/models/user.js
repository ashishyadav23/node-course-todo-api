const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});
let User = mongoose.model('user', userSchema);

module.exports = { User };