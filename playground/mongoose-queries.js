const { ObjectId } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
let id = '5a72a1553751a31a5a1d52ab';
if (!ObjectId.isValid(id)) {
    console.log("Id is not valid");
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log("Todos", todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log("Todos", todo);
});

Todo.findById({
    _id: id
}).then((todo) => {
    console.log("Todos", todo);
});
User.findById(id).then((user) => {
    console.log("fetched User", user);
}, ((err) => {
    console.log("Unable to fetch User", err);
})).catch((err) => {
    console.log("Unable to fetch User", err);
})