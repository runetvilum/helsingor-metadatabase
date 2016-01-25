var config = require('./config.json');
var XLSX = require('xlsx');
var xlsx = XLSX.readFile('MetadatabaseWEB-22122015.xlsx');
var nano = require('nano')({
    "url": config.url,
    "parseUrl": false
});
var db = nano.db.use(config.dbname);
function insertAll() {
    var sheet1 = xlsx.SheetNames[0]; //læs første sheet
    var data = {}
    for (var cell in xlsx.Sheets[sheet1]) {
        if (cell[0] !== '!') {
            var row = cell.match(/\d+/g);
            var col = cell.match(/[a-zA-Z]+/g);
            if (!data.hasOwnProperty(row)) {
                data[row] = {};
            }
            var v = xlsx.Sheets[sheet1][cell].v;
            if (v.trim) {
                v = v.trim();
                v= v.trim('?');
            }
            data[row][col] = v;

        }
    }
    var kolonner = data['1'];
    var docs = [];
    for (var r in data) {
        if (r !== '1') {
            var doc = { properties: {} };
            var row = data[r];
            for (var k in row) {
                var kolonne = kolonner[k];
                doc.properties[kolonne] = row[k];
            }
            docs.push(doc);
        }
    }
    console.log(docs);
    db.bulk({ docs: docs }, function (err, body) {
        //console.log(body);
        console.log(body[0]);
    })
}
function removeAll() {
    db.list({ include_docs: true }, function (err, body) {
        if (!err) {
            var docs = [];
            for (var i = 0; i < body.rows.length; i++) {
                var doc = body.rows[i];
                if (doc.id.indexOf('_design') === -1) {
                    doc.doc._deleted = true;
                    docs.push(doc.doc);
                }
            }
            db.bulk({ docs: docs }, function (err, body) {
                insertAll();
            })
        }
    });
}
removeAll();