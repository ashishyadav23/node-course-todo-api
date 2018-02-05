const { ObjectId } = require("mongodb");
const { Todo } = require("./../../models/todo");
const { User } = require("./../../models/user");
const jwt = require('jsonwebtoken');

const userOneId = new ObjectId();
const userTwoID = new ObjectId();
const users = [{
    _id: userOneId,
    email: 'ashish@example.com',
    password: 'ashish',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: userTwoID,
    email: 'sachin@example.com',
    password: 'sachin',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoID, access: 'auth' }, 'abc123').toString()
    }]
}]
const todos = [{
    _id: new ObjectId(),
    text: 'Sample First text todo'
}, {
    _id: new ObjectId(),
    text: 'Second text todo'
}, , {
    _id: new ObjectId(),
    text: 'third text todo'
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo]);
    }).then(() => {
        done();
    });
}
module.exports = {
    todos,
    populateTodos,
    populateUsers,
    users
}