const express = require('express');
const fs = require('fs');
const parse = require('csv-parse');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
const ini = require('ini');

const config = ini.parse(fs.readFileSync('../config.ini', 'utf-8'))

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/host', (req,res)=> {
    res.status(200).json({host:os.hostname()})
})

app.post('/q', (req,res)=> {

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //jan is 0
    const dd = String(today.getDate()).padStart(2, '0');

    // util func checks $s against `yyyy-mm-dd` regex
    const validate = (s) => {
        return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(s);
    }

    const startDate = validate(req.body.startDate) ?
        new Date(req.body.startDate) :
        new Date([yyyy,mm,dd].join('-'));

    const endDate = validate(req.body.endDate) ?
        new Date(req.body.endDate) :
        new Date([yyyy,mm,dd].join('-'));

    const fileArr = [];
    for (let n=startDate;n<=endDate;n.setDate(n.getDate()+1)) {
        fileArr.push(`${n.getUTCFullYear()}-${String(n.getUTCMonth() + 1).padStart(2, '0')}-${String(n.getUTCDate()).padStart(2, '0')}`);
    }

    const promiseReadStream = (filePath) => {
        return new Promise((resolve,reject) => {
            const data = [];
            fs.createReadStream(__dirname + '/../data/' + filePath + '.csv', {encoding: 'utf-8'})
                .on('error', (e) => {
                    reject(e);
                })
                .pipe(parse({columns: true}))
                .on('data', (row) => {
                    if (row.humidity <= 100) {
                        data.push({...row, time: `${filePath}T${row.time}`})
                    }
                })
                .on('finish', () => resolve(data));
        })
    }

    const promises = fileArr.map(f => {
        return promiseReadStream(f);
    })

    Promise.all(promises)
        .then(dataArr => {
            res.status(200).send({
                alerts: {
                    temp: config.ifttt.WARNING_TEMP,
                    humidity: config.ifttt.WARNING_HUMIDITY
                },
                data: dataArr.flat()
            });
        })
        .catch(e => {
            res.status(400).send(e);
    });
})

if (process.env.NODE_ENV === 'production') {
    // serve prod assets out of client/build
    app.use(express.static('client/build'));
}

app.listen(PORT);