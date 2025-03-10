const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const dbFile = 'database.json';

// Initialize database file if not exists
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]));
}

app.get('/records', (req, res) => {
    const records = JSON.parse(fs.readFileSync(dbFile));
    res.json(records);
});

app.post('/records', (req, res) => {
    const records = JSON.parse(fs.readFileSync(dbFile));
    const newRecord = { id: records.length + 1, ...req.body };
    records.push(newRecord);
    fs.writeFileSync(dbFile, JSON.stringify(records, null, 2));
    res.status(201).json(newRecord);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

