const { MongoClient, ObjectId } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017').then((client) => {
    var db = client.db('TodoApp');
    console.log('connected MongoDB!');
    var id = new ObjectId('5a701a969fe4b42249c0edc3');
    // var updateData = {
    //     $set: {
    //         location: 'Delhi'
    //     }
    // }
    var updateData = {
        $set: {
            location: 'Delhi'
        },
        $inc: {
            age: 10
        }
    }
    var options = {
        returnOriginal: false
    }

    /**update user data */
    findOneAndUpdateUser(db, id, updateData, options);
    client.close();

});

var fetch = (db, obj) => {
    db.collection('Todos').find(obj).toArray().then((results) => {
        console.log("fetched Todos:", JSON.stringify(results, undefined, 1));
    }).catch((err) => {
        console.log("Error in fetching", err);
    });
};

var findOneAndUpdateUser = (db, id, updateData, options) => {
    db.collection('users').findOneAndUpdate({ _id: id }, updateData, options).then((results) => {
        console.log("Updated Users:", JSON.stringify(results, undefined, 1));
    }).catch((err) => {
        console.log("Error in fetching", err);
    });
};
