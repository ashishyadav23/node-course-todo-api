const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const _ = require("lodash");

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;
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
        return res.status(404).send({ todo: [] });
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log(`fetched Todo by ID empty `, todo);

            return res.status(404).send(todo);
        }
        res.status(200).send({ todo });
    }, (err) => {
        console.log(`Error in fetching Todo by ID in err `, err);
        res.status(400).send(err);
    }).catch((err) => {
        console.log(`Error in fetching Todo by ID in catch`, err);

        res.status(400).send(err);
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({ "message": 'Invalid ID' });
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(400).send({ "todo": [] });
        }
        console.log("test", todo);
        res.status(200).send({ todo });
    }, (err) => {
        return res.status(400).send(err);
    }).catch((err) => {
        return res.status(400).send(err);
    })
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectId.isValid(id)) {
        return res.status(404).send([]);
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false,
            body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(400).send({ todo: [] });
        }
        res.status(200).send({ todo });
    }, (err) => {
        res.send(400).send(err);
    }).catch((err) => {
        res.send(400).send(err);
    })
});
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