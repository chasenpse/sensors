const express = require('express');
const fs = require('fs');
const parse = require('csv-parse');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=> {

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1; // jan is 0
    const dd = today.getDate();

    // util func checks $s against `yyyy-mm-dd` regex
    const validate = (s) => {
        return /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(s);
    }

    const startDate = validate(req.query.startdate) ?
        new Date(req.query.startdate) :
        new Date([yyyy,mm,dd].join('-'));

    const endDate = validate(req.query.enddate) ?
        new Date(req.query.enddate) :
        new Date([yyyy,mm,dd].join('-'));

    console.log(startDate, endDate);

    for (let n=startDate;n<=endDate;n.setDate(n.getDate()+1)) {
        console.log(`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`);
    }

    const csv = new Promise((resolve, reject) => {
        const csvData = [];
        fs.createReadStream(__dirname + '/../data/2020-12-02.csv')
            .pipe(parse({columns: true}))
            .on('data',(row)=>{
                csvData.push({...row, time: `2020-12-02T${row.time}`});
            })
            .on('end', () => {
                resolve(csvData);
            })
            .on('error', (e) => { reject(e)})
    })
    csv.then((data)=> {
        res.status(200).send(data);
    });
})
const PORT = process.env.PORT || 5000;
app.listen(PORT);