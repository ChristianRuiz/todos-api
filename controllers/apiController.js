/**
 * Dependencies */
var bodyParser  = require('body-parser');

const todosDb = { none: [] };
let idCounter = 1;

const getUser = req => req.headers['authorization'] || 'none';

const getTodos = (req) => {
    const user = getUser(req);
    if(!todosDb[user]) {
        todosDb[user] = [];
    }

    return todosDb[user];
}

module.exports = function (app) {
    // dependencies setup
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // GET Route for all todos
    app.get('/api/todos', function (req, res) {
        const todos = getTodos(req);
        res.send(todos);
    });

    // GET Route for one single todos from id
    app.get('/api/todo/:id', function (req, res) {
        const todos = getTodos(req);
        const todo = todos.find(t => t.id === req.params.id);
        res.send(todo);
    });

    // POST Route handles create and update
    app.post('/api/todo', function (req, res) {
        const todos = getTodos(req);
        let todo = req.body.id ? todos.find(t => t.id === req.body.id) : undefined;
        if (!todo) {
            todo = {
                id: idCounter++
            };
            todos.push(todo);
        }

        todo.todo = req.body.todo;
        todo.isDone = !!req.body.isDone;
        
        res.send(todo);
    });

    // DELETE Route find and remove specific todos by id
    app.delete('/api/todo', function (req, res) {
        const todos = getTodos(req);

        todosDb[getUser()] = todos.filter(t => t.id !== req.params.id)
        res.send('Success');
    });
}