const express = require('express');
const cors = require('cors');
const fs = require('fs');
const users = require('./app.json');

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get(`/`, (req, res) => {
    res.send(users);
});

app.post(`/`, (req, res) => {
    users.push({ id: users.length, Todo: req.body.Todo });

    fs.writeFile('app.json', JSON.stringify(users), (err) => {
        if (err) throw err;
        console.log('writing done!!');
    });
});

app.delete(`/:id`, (req, res) => {
    console.log('users', users);
    const posts = users.filter((item) => item.id !== req.params.id);
    users.splice(req.params.id, 1);
    fs.writeFile('app.json', JSON.stringify(users), (err) => {
        if (err) throw err;
        console.log('writing done!!');
    });
});

app.put(`/:index/:id`, (req, res) => {
    fs.readFile('app.json', (err, data) => {
        if (err) throw err;
        let arr = JSON.parse(data);
        arr.splice(req.params.index, 1, {
            id: parseInt(req.params.id),
            Todo: req.body.Todo,
        });
        fs.writeFile('app.json', JSON.stringify(arr), (err) => {
            if (err) throw err;
            console.log('writing done!!');
        });
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
