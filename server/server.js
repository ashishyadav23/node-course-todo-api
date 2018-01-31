let express = require('express');
let bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

let app = express();
let port = process.env.Port || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        console.log(`Success while saving todos`, JSON.stringify(doc, undefined, 1));
        res.send(doc);
    }).catch((err) => {
        console.log(`Erro while saving todos ${req.body.text}`, err);
        res.status(400).send(err);
    });
})
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
module.exports = { app };




// let userObj = new User({
//     email:'ashish.yadav@cmss.in                '
// })
// userObj.save().then((userResult) => {
//     console.log("User saved:", userResult);
// }).catch((err) => {
//     console.log("Unable to save user:", err);
// });