// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectId } = require('mongodb');
/**WITH PROMISE */
MongoClient.connect('mongodb://localhost:27017').then((client) => {
    var db = client.db('TodoApp');
    console.log('connected MongoDB!');

    /**Insert */
    // insert(db);

    /**fetch */
    // fetch(db,{});
    /**fetch completed TODOs */
    fetch(db, { completed: true });
    // fetch(db, { _id: new ObjectId('5a6ffa09d5e7f41376507f05') });

    /**getCount */
    // getCount(db);

    /**Fetch from users collection */
    // getUser(db, { name: 'Ashish yadav' });

    client.close();
}).catch((err) => {
    console.log('Unable to connect MongoDB!', err);
});

var fetch = (db, obj) => {
    db.collection('Todos').find(obj).toArray().then((results) => {
        console.log("fetched Todos:", JSON.stringify(results, undefined, 1));
    }).catch((err) => {
        console.log("Error in fetching", err);
    });
};

var insert = db => {
    db.collection('users').insertOne({
        name: 'Ashish yadav',
        age: 24,
        location: 'India'
    }, (err, userResult) => {
        if (err)
            return console.log("Unable to insert into users collections", err);
        console.log("After insertion user", JSON.stringify(userResult.ops[0]._id.getTimestamp(), undefined, 2));
    });
};

var getCount = (db, obj) => {
    db.collection('Todos').find(obj).count().then((count) => {
        console.log("fetched Todos count:", JSON.stringify(count, undefined, 1));
    }).catch((err) => {
        console.log("Error in fetching", err);
    });
}

var getUser = (db, obj) => {
    db.collection('users').find(obj).toArray().then((usersList) => {
        console.log("fetched Users List:", JSON.stringify(usersList, undefined, 1));
    }).catch((err) => {
        console.log("Error in fetching", err);
    })
};

/**WITHOUT PROMISE */
/*
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    var db = client.db('TodoApp');
    if (err) {
        return console.log('Unable to connect MongoDB!');
    }
    console.log('connected MongoDB!');
    insert(db);
    client.close();
});
*/