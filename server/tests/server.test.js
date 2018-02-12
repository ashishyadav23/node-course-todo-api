const expect = require('expect');
const request = require('supertest');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const { ObjectId } = require('mongodb');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');
const _ = require('lodash');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /Todos', () => {
    it('should create a new Todo', (done) => {
        var text = 'Todo text';

        request(app)
            .post('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .send({ text, _creator: users[0]._id })
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
            .set('x-auth', users[0].tokens[0].token)
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err)
                    return done(err);
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3);
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
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            // .expect((res) => {
            //     expect(res.body.todos.length).toBe(1);
            // })
            .end(done);
    });


});

describe('GET /todos/:id', () => {
    it('should get Todos by ID', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .set('x-auth', users[0].tokens[0].token)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should not get Todos by other ID', (done) => {
        request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .expect(404)
            .set('x-auth', users[0].tokens[0].token)
            .end(done);
    });

    it('should return 404 when Todo by ID not found', (done) => {
        var id = new ObjectId();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 404 when Todo by ID for non-objects', (done) => {
        request(app)
            .get(`/todos/123dsd}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/id', () => {
    // var id = new ObjectId();
    it('Should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)

            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toBeNull();
                    done();
                }).catch((e) => {
                    done(e);
                })
            });
    });

    it('Should return a 404 when todo not found', (done) => {
        var hexId = new ObjectId().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)

            .expect(400)
            .end(done);
    });

    it('Should return a 404 when Id is invalid', (done) => {
        var hexId = '123456';
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .set('x-auth', users[0].tokens[0].token)

            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update a existing todo', (done) => {
        var id = todos[0]._id.toHexString();
        var completed = true;
        var text = "Hello this is text update"
        request(app)
            .patch(`/todos/${id}`)
            .send({ completed, text })
            .set('x-auth', users[0].tokens[0].token)

            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof (res.body.todo.completedAt)).toBe("number");
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var id = todos[0]._id.toHexString();
        var completed = false;
        var text = "Hello this is text update"
        request(app)
            .patch(`/todos/${id}`)
            .set('x-auth', users[0].tokens[0].token)

            .send({ completed, text })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end(done);
    }); populateTodos

    it('Should return a 404 when Id is invalid', (done) => {
        var id = '124454';
        var completed = false;
        request(app)
            .patch(`/todos/${id}`)
            .send({ completed })
            .set('x-auth', users[0].tokens[0].token)

            .expect(404)
            .end(done);
    });

});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);

    });

    it('should return 401 if user is not authenticated', (done) => {
        request(app)
            .get('/users/me')
            // .set('x-auth', users[0].tokens[0].token)
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });

});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'dilip@text.com';
        var password = "dilip";
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err)
                    return done(err);
                User.findOne({ email }).then((user) => {

                    expect(user.email).toBe(email);
                    done();

                }).catch((err) => {
                    done(err);
                });

            });

    });

    it('should return a validation error if request is invalid', (done) => {
        var email = 'dilipcom';
        var password = "d";
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });

    it('should not create a user if email is in use', (done) => {
        var email = users[0].email;
        var password = users[0].password;
        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login user and return token', (done) => {
        var email = users[0].email;
        var password = users[0].password;
        request(app)
            .post('/users/login')
            .send({ email, password })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[0]._id).then((user) => {
                    console.log("tokens", user.tokens[0]);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[0]._id).then((user) => {
                    console.log(user);
                    expect(user.token.length).toBe(0);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });
});

