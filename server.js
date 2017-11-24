const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
