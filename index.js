const express = require("express");
const app = express();
const Sequelize = require(`sequelize`);
const bodyParser = require(`body-parser`);
const exphbs = require('express-handlebars');
const post = require(`./models/Post`);
const res = require("express/lib/response");

// Config // Template Engine
var handle = exphbs.create({
    defaultLayout: 'main'
});

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//handlebars
app.engine('handlebars', handle.engine);
app.set('view engine', 'handlebars');


app.get("/", function (req, res) {
    post.findAll({order: [[`id`, `DESC`]]}).then(function(posts){
        res.render(`home`, {posts: posts})
    })
})

app.get("/formu", function(req, res){
    res.render(`formu`)
})

app.post("/add", function(req, res){
    post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        res.send("Houve um erro:" + erro)
    })
})

app.get('/deletar/:id', (req, res) => {
    post.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/')
    }).catch((erro) => {
        res.send('Esta postagem não existe!')
    })
})

app.listen(8090, function(){
    console.log("Servidor Online!")
});