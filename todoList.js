var express = require('express');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var handlers = require('./handlers').routeHandler;

var app = express();

app.use(cookieSession({
        name: 'session',
        secret: 'todoSecret'
    })
)

.use(function(req, res, next) {
    handlers.init(req, res, next);
})

.use(express.static(__dirname + '/views'))

.disable('x-powered-by')

.use(urlencodedParser = bodyParser.urlencoded({ extended: false }))

.use(bodyParser.json())

.post('/registration', (req, res) => {
    handlers.registration(req, res);
})

.get('/', function(req, res) {
    if(req.session.userId != '')
        handlers.loadTasks(req, res);
    else
        res.render('accueil.ejs', {
            wrongPassword: true,
            userFound: false
        });
})

.post('/load', function(req, res, next) {
    handlers.loader(req, res);
})

.post('/createList', (req, res) => {
    handlers.createList(req, res);
})

.post('/todolist/ajouterTache', function(req, res) {
    handlers.ajouterTache(req, res);
})

.get('/todolist/supprimerTache', function(req, res) {
    handlers.supprimerTache(req, res);
})

.get('/deconnexion', function(req, res) {
    handlers.deconnexion(req, res);
})

.use(function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send("Page inconnue!"); 
});

app.listen(8080);