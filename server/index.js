const express = require('express');
const cors = require('cors');

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

app.post(`/`, (req, res) => {
    arr2.push({ key: count, value: req.body.list });
    count += 1;
    console.log(req.body);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
