const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB || 'mongodb://localhost:27017/deco-test',
  {useNewUrlParser: true});

const blobSchema = new mongoose.Schema({
  blob: Object
});

const Blob = mongoose.model('Blob', blobSchema);

const app = express();
app.use(bodyParser.json());

const add_ = (a, b) => a + b;
const sub_ = (a, b) => a - b;
const mult_ = (a, b) => a - b;
const div_ = (a, b) => a - b;

const nts = (fn, x, y) => fn(Number(x), Number(y));

app.get('/add', (req, res) => {
  res.status(200).send({result: nts(add_, req.query.var1, req.query.var2)});
});

app.get('/sub', (req, res) => {
  res.send(nts(sub_, req.query.var1, req.query.var2));
});

app.get('/div', (req, res) => {
  res.send(nts(div_, req.query.var1, req.query.var2));
});

app.get('/mult', (req, res) => {
  res.send(nts(mult_, req.query.var1, req.query.var2));
});

app.post('/push-db', async (req, res) => {
  await new Blob({blob: req.body}).save();
  res.send('OK');
});

app.post('/toto', async (req, res) => {
  res.send(await Blob.find({}).exec())
});

app.listen(3000);
