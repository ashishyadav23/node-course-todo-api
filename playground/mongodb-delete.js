const { MongoClient, ObjectId } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017').then((client) => {
    var db = client.db('TodoApp');
    console.log('connected MongoDB!');
    /**Deleting one */
    // deleteOne(db, { completed: false });


    /**Deleting Many */
    // deleteMany(db, { completed: false });

    /**findOneAndDelete */
    // findOneAndDelete(db, { completed: false });

    /**dleete User Many */
    // deleteManyUser(db,{name:'Ashish yadav'});

    /**findAndDeleteUser */
    findAndDeleteUser(db,{age:18});
    client.close();

});

var deleteOne = (db, obj) => {
    db.collection('Todos').deleteOne(obj).then((result) => {
        console.log('Successfully deleted', result);
    }).catch((err) => {
        console.log(`Error while deleting ${obj}`, err);
    });
};

var deleteMany = (db, obj) => {
    db.collection('Todos').deleteMany(obj).then((result) => {
        console.log('Successfully deleted', result);
    }).catch((err) => {
        console.log(`Error while deleting ${obj}`, err);
    });
};

var findOneAndDelete = (db, obj) => {
    db.collection('Todos').findOneAndDelete(obj).then((result) => {
        console.log('findOneAndDelete', result);
    }).catch((err) => {
        console.log(`Error while deleting findOneAndDelete ${obj}`, err);
    });
}

var deleteManyUser = (db,obj)=>{
    db.collection('users').deleteMany(obj).then((result)=>{
        console.log('deleteManyUser', result);
    }).catch((err)=>{
        console.log(`Error while deleting userMany ${obj}`, err);
    })
}

var findAndDeleteUser = (db,obj)=>{
    db.collection('users').findOneAndDelete(obj).then((result)=>{
        console.log('deleteManyUser', result);
    }).catch((err)=>{
        console.log(`Error while deleting userMany ${obj}`, err);
    })
}



var fetch = (db, obj) => {
    db.collection('Todos').find(obj).toArray().then((results) => {
        console.log("fetched Todos:", JSON.stringify(results, undefined, 1));
    }).catch((err) => {
        console.log("Error in fetching", err);
    });
};
