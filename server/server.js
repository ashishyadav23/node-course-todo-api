let express = require('express');
let bodyParser = require('body-parser');
let { ObjectId } = require('mongodb');

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
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
        console.log(`Invalid ID found`, id);
        return res.status(404).send({todo:[]});
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log(`fetched Todo by ID empty `, todo);

            return res.status(404).send(todo);
        }
        res.status(200).send({todo});
    }, (err) => {
        console.log(`Error in fetching Todo by ID in err `, err);
        res.status(400).send(err);
    }).catch((err) => {
        console.log(`Error in fetching Todo by ID in catch`, err);

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