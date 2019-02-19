var express = require('express');
var app = express();
var methodOverride = require('method-override');
var fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.get('/', function(req, res) {
    res.render("articles/home");
});

app.get('/articles/new', function(req, res) {
    res.render("articles/new");
});

app.post('/articles', function(req, res) {
    var articles = fs.readFileSync("./articles.json");
    articles = JSON.parse(articles);
    articles.push(req.body);
    fs.writeFileSync("./articles.json", JSON.stringify(articles));
    res.redirect("/articles");
});

app.get('/articles/gallery', function(req, res) {
    res.render("articles/gallery");
});

app.get('/articles', function(req, res) {
    var articles = fs.readFileSync("./articles.json");
        articles = JSON.parse(articles);
    res.render('articles/index', {myArticles: articles});
});

app.get('/articles/:id', function (req, res) {
    var articles = fs.readFileSync("./articles.json");
    articles = JSON.parse(articles);
    var articleIndex = parseInt(req.params.id);
    res.render('articles/show', {myArticles: articles[articleIndex]});
})

app.delete('/articles/:id', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    articles = JSON.parse(articles);
    articles.splice(parseInt(req.params.id), 1);
    fs.writeFileSync( './articles.json', JSON.stringify(articles));
    res.redirect('/articles');
})

app.get('/articles/:id/edit', function(req, res) {
    var articles = fs.readFileSync("./articles.json");
    articles = JSON.parse(articles);
    var articleIndex = parseInt(req.params.id);
    res.render('articles/edit', {article: articles[articleIndex], articleId: articleIndex});
})

app.put('/articles/:id', function(req, res) {
    var articles = fs.readFileSync('./articles.json');
    articles = JSON.parse(articles);
    var articleIndex = parseInt(req.params.id);
    articles[articleIndex].title = req.body.title;
    articles[articleIndex].author = req.body.author;
    articles[articleIndex].body = req.body.body;
    fs.writeFileSync('./articles.json', JSON.stringify(articles));
    res.redirect("/articles/" + articleIndex);
})

app.listen(3000);



