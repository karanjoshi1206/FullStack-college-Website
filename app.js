const express = require("express");
const app = express();
const port = 80;
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/BiasData', { useNewUrlParser: true });
//Defining Mongoose Schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    Fname: String,
    Mname:String,
    check1:String,
    check2:String,
    checkM:String,
    checkF:String,
    checkO:String
});
const contact = mongoose.model('contact', ContactSchema);

app.set('view engine', 'html');
app.use('/static', express.static('static')) 
app.use(express.urlencoded())



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/contact', function(req, res) {
    res.sendFile(path.join(__dirname + '/contact.html'));
});

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved")
    }).catch(() => {
        res.status(400).send("item not saved")
    });
})
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});