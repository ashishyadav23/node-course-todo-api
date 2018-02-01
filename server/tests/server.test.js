const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
let { ObjectId } = require('mongodb');

const todos = [{
    _id: new ObjectId(),
    text: 'First text todo'
}, {
    _id: new ObjectId(),
    text: 'Second text todo'
}];
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
})

describe('POST /Todos', () => {
    it('should create a new Todo', (done) => {
        var text = 'Todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err)
                    return done(err);

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                })
            })

    });

    it('should not create a todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err)
                    return done(err);
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => {
                    done(err)
                })
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });


});

describe('GET /todos/:id', () => {
    it('should get Todos by ID', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 when Todo by ID not found', (done) => {
        var id = new ObjectId();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 when Todo by ID for non-objects', (done) => {
        request(app)
            .get(`/todos/123dsd}`)
            .expect(404)
            .end(done);
    });
})
