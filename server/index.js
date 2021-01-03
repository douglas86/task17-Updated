const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let arr = ['one', 'two'];
let arr2 = [];

app.get(`/`, (req, res) => {
    res.send(arr2);
});

let count = 0;

// app.post(`/`, (req, res) => {
//     arr2.push({ key: count, value: req.body.list });
//     count += 1;
//     console.log(req.body);
// });

const writing = (req, err, data) => {
    let json = JSON.parse(data.toString());
    json.Todo = { Todo: req.body.Todo };
    let writeData = fs.writeFile('app.json', JSON.stringify(json), (err) => {
        if (err) {
            return console.error(err);
        } else {
            console.log('Success!');
        }
    });
};

app.post(`/`, (req, res) => {
    fs.readFile('app.json', (err, data) => {
        if (err) {
            console.log('2');
            return console.error(err);
        }

        writing(req, err, data);
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
