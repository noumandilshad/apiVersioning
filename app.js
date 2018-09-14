const express = require('express');
const app = express();
const port = 3000 | process.env.port;
const getApiVersion = require('./middleware/getApiVersion');
const controller = require('./controllers');
const acl = require('express-acl');
const benchmark_noapi=require('./controller methods/benchmark_noapi');
const apiBenchmark = require('api-benchmark');
const bodyParser = require('body-parser');

app.get('/benchmark_api', getApiVersion, controller.benchmark_api);

app.listen(port,()=>console.log(`http://localhost:${port}`));
