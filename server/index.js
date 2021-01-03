const express = require('express');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

let arr = ['one', 'two'];

app.get(`/`, (req, res) => {
    res.send('Hello');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
