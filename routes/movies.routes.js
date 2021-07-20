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

module.exports = router
