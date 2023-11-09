const express = require('express')
const {randomData} = require('./data/data')
const app = express()

app.get("/api/randomWord", (req, res) => {
    res.json(randomData())
})

app.listen(8080)