const { ObjectId } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove().then((res) => {
//     console.log("Removed succesfully", res);
// });
Todo.findOneAndRemove('5a7403b16c47ed0f6bbaf4bd').then((res) => {
    console.log("Removed succesfully", res);
});

Todo.findOneAndRemove('5a7403b16c47ed0f6bbaf4bd').then((res) => {
    console.log("Removed succesfully", res);
});

