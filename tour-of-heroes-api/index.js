var express = require('express')
var app = express()

const heroes = [
      { id: 11, name: 'Superman' },  
      { id: 12, name: 'Wonder Woman' },  
      { id: 13, name: 'Captain America' },  
      { id: 14, name: 'Ironman' },  
      { id: 15, name: 'Green Arrow' },  
      { id: 16, name: 'Firestorm' },  
      { id: 17, name: 'Atom' },  
      { id: 18, name: 'The Hulk' },  
      { id: 19, name: 'Vibe' },  
      { id: 20, name: 'Gypsy' },  
    ];
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/heroes', function (req, res) {
    res.status(200).json(heroes)
})

app.get('/heroes/:id', function (req, res) {
    const id = req.params.id
    const hero = heroes.find(hero => hero.id == id)

    if(!hero){
        res.status(404).send("no hero found")
    }

    res.status(200).json(hero)
})
 
app.listen(3000, function(){
    console.log("listening on port 3000")
})
