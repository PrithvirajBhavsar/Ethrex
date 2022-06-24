const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var mongoose = require('mongoose');
const app = express();

const registration = require("./routes/registration.js");
const content = require("./routes/content.js");

app.use(cors());

app.use(bodyParser.json({ extended:true }))
app.use(bodyParser.urlencoded({ extended:true }))

app.use(
    session({
        secret:"Prithviraj",
        cookie: { secure: true }
    })
)

app.use(express.static('public'))

app.use(cookieParser())

app.use("/",registration);
app.use("/",content);


var URL = 'mongodb://localhost:27017/netflix';
// var URL = 'mongodb+srv://Prithviraj:Prithviraj123@cluster0.umchc.mongodb.net/?retryWrites=true&w=majority';
const port = 3001;

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    });
}).catch((error)=>{
    console.log(error);
})