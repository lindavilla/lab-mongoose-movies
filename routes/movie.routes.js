const express = require('express');
const Movie = require('../models/movie.model');
const Celebrity = require('../models/celebrity.model')

const router = express.Router();


router.get('/movies', (req, res) => {
 Movie.find({})
 .then((movies) => res.render('movies/index', {movies}))
 .catch((error) => console.log('error showing all celebrities', error));
});


router.get('/movies/new',(req,res,next) => {
    res.render('movies/new');
});

router.post('/movies/new', (req, res, next) => {
    const {title, genre, plot } = req.body;
    Movie.create({title, genre, plot})
    .then(() => res.redirect('/movies'))
  });


  router.get('/movies/:id', (req, res, next) => {
    const movieId = req.params.id
Movie.findById(movieId)
.then((movieDetail) => res.render('movies/show',{movie: movieDetail}))
.catch((error) => console.log('error showing the movie', error));
});


router.get('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;
    Movie.findById(movieId)
    .then(movieToEdit => {
      console.log(movieToEdit);
      return res.render('movies/edit', { movie: movieToEdit });
    })
    .catch(error => next(error));
  });
  
  router.post('/movies/:id/edit', (req, res, next) => {
    const movieId = req.params.id;
    const { title, genre, plot } = req.body;
    
    Movie.findByIdAndUpdate(movieId, { title, plot, genre }, { new: true })
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
  });

  

router.post('/movies/:id/delete', (req, res, next) => {
    const movieId= req.params.id;
    Movie.findByIdAndDelete(movieId)
    .then(()=> res.redirect('/movies'))
    });



    module.exports = router;