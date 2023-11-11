const express = require('express')
const {randomData} = require('./data/data')
const app = express()

app.use(express.static('./dist'))

app.get("/api/randomWord", (req, res) => {
    res.json(randomData())
})

app.listen(8080)