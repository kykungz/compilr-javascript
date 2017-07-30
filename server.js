'use strict';
const ip = require('ip');
const fs = require('mz/fs');
const winston = require('winston');
const rimraf = require('rimraf');
const exec = require('mz/child_process').exec;
const bodyParser = require('body-parser')

const express = require('express');
const app = express();

// Constants
const PORT = process.env.PORT || 8080;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// root
app.get('/', (req, res) => {
  res.send('api ready');
});

app.post('/compile/', async (req, res, next) => {
  let content = req.body.content
  console.log(content)
  let dirname
  try {
    dirname = await fs.mkdtemp('./run/tmp_')
    console.log(`created directory ${dirname}`);

    await fs.writeFile(`${dirname}/test.js`, content)
    console.log(`created file ${dirname}/test.js`)

    try {
      result = await exec(`node ${dirname}/test.js`)
      res.send(result)
    } catch (err) {
      res.send(err)
    }

  } catch (e) {
    next(e)
  } finally {
    await fs.rmdir(dirname)
    console.log(`removed ${dirname}`);
  }
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.log(err);
  winston.log('error', err)
  res.status(500).render('error', {
    message: err.message,
    error: err
  });
})

app.listen(PORT, async () => {
  try {
    await fs.mkdir('run')
    console.log(`created run folder`)
  } catch (e) {
    console.log('run directory already exists');
  } finally {
    console.log(`Running on http://${ip.address()}:${PORT}`);
  }
});
