const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', app: 'tesla-robot-parallax' });
});

app.listen(PORT, () => {
    console.log(`Tesla Robot Parallax Demo running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} to view`);
});
