const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static('public'))

// These two middlewares handle POST data, the first for "form encoded" data
// The second for "json encoded" data
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// this route just renders the (very ugly) index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// This route handles the GET version of the form request
app.get('/form', (req, res) => {
    let name = req.query.name;
    let age = req.query.age;

    let ageResponse = "pretty young"
    if(age > 40) {
        ageResponse = "kinda old"
    }

    let serverResponseValue = `Hello ${name}, you are ${ageResponse}.`

    res.send(serverResponseValue)
});

// This route handles the POST version of the request
app.post('/form', (req, res) => {
    let name = req.body.name; // Note: body instead of query
    let age = req.body.age;

    let ageResponse = "pretty young"
    if(age > 40) {
        ageResponse = "kinda old"
    }

    let serverResponseValue = `Hello ${name}, you are ${ageResponse}.`

    res.send(serverResponseValue)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
