const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var pass = "abc123";
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(pass, salt, (error, hash) => {
//         console.log("Pass hash", hash);
//     })
// });
var hashedPassword = '$2a$10$ZSuPEgtmniC5h0V1EFQPReD4dPJAPxVzNdXThKUpcfipfsyEU6Xp6';
bcrypt.compare(pass, hashedPassword, (err, result) => {
    console.log("Resul", result);
})
// var data = {
//     id: 10
// };
// var token = jwt.sign(data, '123abc');
// console.log(token);
// var decode = jwt.verify(token, '123abc');
// console.log(decode);
