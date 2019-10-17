let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname)));
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname + '/lab_siya_peng.html'));
})
app.listen(8080, () => {console.log('Server Ready!')});



app.post('/artist/add', (req, res) => {
    var artist={
        name: req.body.artist_name,
        about: req.body.about_artist,
        url: req.body.image_url
    }
    // read everybody
    fs.readFile(path.join(__dirname + '/synchronous.txt'), (err, data) => {
        if (err) {
            obj_arr = [];
        } else {
            // append new body
            obj_arr = JSON.parse(data);
        }
        obj_arr.push(artist);
        // save everybody again
        fs.writeFileSync("synchronous.txt", JSON.stringify(obj_arr));
        /* Need to add some code here */
        res.redirect(301, '/');
    });
});

app.get('/getData',(req,res) => {
    var data = fs.readFileSync(path.join(__dirname + '/synchronous.txt'));
    var obj = JSON.parse(data);
    res.json(obj);
})

app.post('/artist/delete/:id',(req,res) => {
    // read everybody
    fs.readFile(path.join(__dirname + '/synchronous.txt'), (err, data) => {
        if (err) {
            obj_arr = [];
        } else {
            // append new body
            obj_arr = JSON.parse(data);
        }
        obj_arr.splice(req.param.id, 1);
        // save everybody again
        fs.writeFileSync("synchronous.txt", JSON.stringify(obj_arr));
        /* Need to add some code here */
        res.redirect(301, '/');
    });
})
// GET '/getJSON' -> send JSON file
// 前端 fetch