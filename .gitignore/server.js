const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended: true}))

app.use('/public', express.static(path.join(__dirname, 'public/')))


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.listen(1000,function(){
    console.log('listening on 1000')
})

MongoClient.connect('mongodb+srv://Danik:hacker94@cluster0.m7dobiy.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
    console.log('Connected to Database')
    if (err) return console.log(err)
    .then(client => {
        const db = client.db('Checklist-app')
        const listCollection = db.collection('list')

        app.post('/list', (req,res) => {
            listCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                })
            })

            .catch(error => console.error(error))
        })
        .catch(console.error)
})
