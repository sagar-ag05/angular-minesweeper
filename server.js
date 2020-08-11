const express = require('express');
const app = express();

app.use(express.static('./dist/minesweeper'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/minesweeper/'});
});

app.listen(process.env.PORT || 8081);
