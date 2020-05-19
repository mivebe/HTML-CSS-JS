const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log('User Connected');
    res.send('Hello Wordl!')
});
PORT = 5000;
app.listen(PORT, () => console.log(`Server Port ${PORT}`));
