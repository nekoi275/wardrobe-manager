var express = require('express');
var mysql = require('mysql');
var app = express();

var db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'eroluse3',
  database : 'wardrobe'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
    app.listen(80, function () {
        console.log('App working on http://127.0.0.1:80');
    });
});

app.use(express.static('public'));
app.use(express.json()); 

app.post('/api/clothes', function (req, res) {
    var sql = 'INSERT INTO clothes (type, brand, color, description, price, date, season) VALUES ?';
    var values = [[req.body.type, req.body.brand, req.body.color, req.body.description, 
                   req.body.price, req.body.date, req.body.season]];
    db.query(sql, [values], function(err, result) {
        if (err) {
            res.status(500).send(err);
            throw err;
        }
        res.json({'id': result.insertId});
    });
});

app.get('/api/clothes', function(req, res) {
    var sql = 'SELECT * FROM clothes';
    db.query(sql, function(err, result) {
        if (err) {
            res.status(500).send(err);
            throw err;
        }
        res.send(result);
    });   
});

app.delete('/api/clothes', function(req, res) {
    var sql = 'DELETE FROM clothes WHERE id = ' + req.body.id;
    db.query(sql, function(err, result) {
        if (err) {
            res.status(500).send(err);
            throw err;
        }
        res.status(200).end();
    });
});

