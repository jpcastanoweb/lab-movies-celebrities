// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router()
const Celebrity = require("./../models/Celebrity.model")
const Movie = require("./../models/Movie.model")
const mongoose = require("mongoose")

router.get("/movies/create", (req, res) => {
  Celebrity.find()
    .then((celebritiesFound) =>
      res.render("movies/new-movie", {
        celebrities: celebritiesFound,
      })
    )
    .catch((e) => console.log(e))
})

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, castIds } = req.body
  const cast = []
  for (let i = 0; i < castIds.length; i++) {
    cast.push(mongoose.Types.ObjectId(castIds[i]))
  }

  console.log(cast)

  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect("/movies")
    })
    .catch((e) => console.log(e))
})

router.get("/movies", (req, res) => {
  Movie.find()
    .then((moviesFound) => {
      res.render("movies/movies.hbs", {
        movies: moviesFound,
      })
    })
    .catch((e) => console.log(e))
})

router.get("/movies/:id", (req, res) => {
  const { id } = req.params

  Movie.findById(id)
    .populate("cast")
    .then((movieFound) => {
      res.render("movies/movie-details", {
        movie: movieFound,
      })
    })
    .catch((e) => console.log(e))
})

router.post("/movies/:id/delete", (req, res) => {
  const { id } = req.params

  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies")
    })
    .catch((e) => console.log(e))
})

router.get("/movies/:id/edit", (req, res) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      Celebrity.find({ _id: { $in: movie.cast } }).then((celebrities) => {
        Celebrity.find().then((allCelebrities) => {
          console.log("MovieFound ", movie)
          console.log("Celebrities in movie", celebrities)
          console.log("All Celebrities", allCelebrities)
          res.render("movies/edit-movie", {
            movie,
            celebrities,
            allCelebrities,
          })
        })
      })
    })
    .catch((e) => console.log(e))
})

router.post("/movies/:id/edit", (req, res) => {
  const { title, genre, plot, castIds } = req.body
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot })
    .then(() => {
      res.redirect("/movies")
    })
    .catch((e) => console.log(e))
})

module.exports = router
