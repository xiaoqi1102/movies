/**
 * Created by xiaoqi on 16/8/14.
 */

var express = require('express');
var path= require('path');
var mongoose =require('mongoose');
var _=require('underscore');
mongoose.connect('mongodb://localhost/movie');
var port =process.env.PORT||3000;
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('views','./views/pages');
app.set('view engine','jade');
//app.use(express.bodyParser())
app.use(express.static(path.join(__dirname,'public')));
app.locals.moment=require('moment');
app.listen(port);

var Movie=require('./models/movie');
console.log('movies started on port '+3000);

//index page
app.get('/',function (req, res) {
    Movie.fetch({},function (err, movies) {
        if(err){
            console.log(err);
        }
        res.render('index',{
            title:'movies 首页',
            movies:movies
        })
    })

});

//detail page

app.get('/movie/:id',function (req, res) {
     var id =req.params.id;
    Movie.findById(id,function (err, movie) {
        console.log(movie);
        res.render('detail',{
            title:'电影详情页',
            movie:movie
        })
    });

});

//list page

app.get('/admin/list',function (req, res) {
    Movie.fetch({},function (err, movies) {
        if(err){
            console.log(err);
        }
        res.render('list',{
            title:'movies 列表页',
            movies:movies
        })
    })

});
//search movies
app.get('/movies/search',function (req, res) {
    let searchObj={};
    console.log('params',req.params);
    console.log('queryString',req.query);
    searchObj=req.query;
    Movie.fetch(searchObj,function (err, movies) {
        //console.log(movies);
        if(err){
            console.log(err);
        }
        res.send({
            movies:movies
        })
    })
});
//admin update movie
app.get('/admin/update/:id',function (req, res) {
    var id =req.params.id;
    if(id){
        Movie.findById(id,function (err, movie) {
            res.render('admin',{
                title:'后天更新页',
                movie:movie
            })
        })
    }
});
//ist delete movie
 app.delete('/admin/list',function (req, res) {
    var id =req.query.id;
     if(id){
         Movie.remove({_id:id},function (err, movie) {
             if (err){
                 console.log(err)
             }else {
                 res.json({success:1})
             }
         })
     }else {

     }
});

//admin page
app.get('/admin/movies',function (req, res) {
    res.render('admin',{
        title:'movies 后台录入页',
        movie:{
            title:'',
            doctor:'',
            country:'',
            year:'',
            poster:'',
            flash:'',
            summary:'',
            language:''
        }
    })
});

//admin post movie
app.post('/admin/movie/new',function (req, res) {
    //console.log(res.json());
    //var objString=JSON.stringify(req);
    //var  a=res.json(req.body)
    var obj={name:'add movie',method:'post'};
   // res.send('post movie data,res:');

   // return;
    var movieObj=req.body.movie;
   var id =req.body.movie._id;
    console.log(id);
    var _moive;
    if(id!=='undefined'){
        Movie.findById(id,function (err,movie) {
            if(err){
                console.log(err);
            }
            _moive=_.extend(movie,movieObj);
            _moive.save(function (err,movie) {
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+movie._id);
            })

        })
    }else {
        _moive=new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            language:movieObj.language,
            year:movieObj.year,
            poster:movieObj.poster,
            flash:movieObj.flash
        });
        _moive.save(function (err,movie) {
            if(err){
                console.log(err);
            }
            res.redirect('/movie/'+movie._id);
        })
    }
});