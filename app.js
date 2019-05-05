const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');


const PORT = 8080
const SERVER_ADDRESS = '0.0.0.0'
const NEPTUNE_PORT = process.env.NEPTUNE_PORT || 8182
const NEPTUNE_ENDPOINT = process.env.NEPTUNE_ENDPOINT || "http://localhost:" + NEPTUNE_PORT

const app = express()

// ***************************
// Middlewares
// ***************************
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ***************************
// Server check
// ***************************
app.get('/', (_req, res) =>
    res.send(`Graphexp Server side component is Running! \
Listening on port ${PORT} in ${SERVER_ADDRESS}! for neptune @:${NEPTUNE_ENDPOINT}`)
)

// ***************************
// Neptune forward route
// ***************************
app.post('/', (req, res) => {
    console.log(req)
    var data = req.body


    // Send request to neptune    
    axios.post(NEPTUNE_ENDPOINT, data)
        .then(response => {
            queryResult = response.data

            console.log("*********** RESPONSE RECEIVED FROM Neptune *********** ")
            console.log(queryResult)

            // Return to client
            res.send(queryResult)
        })
        .catch(error => {
            res.send("Neptune error: " + error)
        })

});

app.listen(PORT, SERVER_ADDRESS, () =>
    console.log(`Listening on port ${PORT} in ${SERVER_ADDRESS}! for neptune @:${NEPTUNE_ENDPOINT}`))


