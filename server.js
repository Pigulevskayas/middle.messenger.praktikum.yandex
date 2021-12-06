const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist/'));
app.listen(PORT, function() {
	console.log(`listen PORT ${PORT}`);
});

app.get('/*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './dist/', 'index.html'), (err) => {
		if (err) res.status(500).send(err);
	});
});
