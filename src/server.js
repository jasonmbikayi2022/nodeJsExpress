const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const utils = require('./utils');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// fn to create express server
const create = async () => {

    // server
    const app = express();
    app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

    
    // Log request
    app.use(utils.appLogger);

    app.use(bodyParser.json()); // support json encoded bodies
    //app.use(bodyParser.urlencoded({ extended: true },console.log(bodyParser.json))); // support encoded bodies
    app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    // root route - serve static file
    app.get('/api/hello', (req, res) => {
        res.json({hello:'Welcome again', serviceid:'testing', servicename:'testname'});
        res.end();
    });

      // root route - serve static file
    app.get('/api/id', (req, res) => {

        res.json({firstName:'Jason', LastName:'Auguy Mbikayi', Department:'DIOS', Position:'Senior Application Support Technician'});
        res.end();
    });

   // Middleware & static file
    app.use(express.static('public'));
    app.use(morgan('dev'));

    app.post('/api/register', (req, res) => {
            // req.body contains the parsed xml
            // console.log(req.url, req.method,req.rawHeaders[1]);
            // req.setHeader('Content-Type', 'text/json');
            // _res.setHeader('Content-Type', 'text/json');
            // req.body({ firstName: '', LastName: '', Department: '', Position: '' });
            // req.json({ firstName: '', LastName: '', Department: '', Position: '' });
            // req.end();
            //console.log(req.hostname);
            //console.log(req.url, req.method,req.rawHeaders[1],req.body);
            //console.log(req.body);

            console.log('A new request has been made');
            console.log('hostname:', req.hostname);
            console.log('path:', req.path);
            console.log('method:', req.method);
            //console.log('body',bodyParser.json);
            console.log('requestbody:\n',req.body);
            //req.end();
            res.json({message:'received'});
            //res.end();

        });

    // root route - serve static file
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/client.html')));

       // root route - serve static file
       app.get('/webpages', (req, res) => res.sendFile(path.join(__dirname, '../QUL_LibTest.html')));

    // Catch errors
    app.use(utils.logErrors);
    app.use(utils.clientError404Handler);
    app.use(utils.clientError500Handler);
    app.use(utils.errorHandler);


    return app;
};

module.exports = {
    create
};
