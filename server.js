const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/messages', (req, res) => {
    const newMessage = req.body;
    const messageString = `Name: ${newMessage.name}, Email: ${newMessage.email}, Page: ${newMessage.page}, Message: ${newMessage.message}\n`;
    fs.appendFile('messages.txt', messageString, (err) => {
        if (err) throw err;
        console.log('Message appended to file.');
        res.sendStatus(200);
    });
});

app.get('/api/messages', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) throw err;
        const messages = data.split('\n').filter(msg => msg.trim() !== '');
        res.json(messages);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
