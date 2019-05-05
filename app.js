const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');


const PORT = 8080

const app = express()

app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// ***************************
// Server check
// ***************************
app.get('/', (req, res) => res.send('Graphexp Server side component is Running!'))

// ***************************
// Neptune forward route
// ***************************
app.post('/', (req, res) => {
    console.log(req)
    var data = req.body
    

    // Send request to neptune    
    axios.post('http://localhost:8182/', data)
        .then( response => {
            queryResult = response.data

            console.log("*********** RESPONSE RECEIVED FROM Neptune *********** ")            
            console.log(queryResult)
            
            // Return to client
            res.send(queryResult)
        })
        .catch( error => {
            res.send("Neptune error: " + error)
        })

});

app.listen(PORT, () => console.log("Listening on port ${PORT}!"))


