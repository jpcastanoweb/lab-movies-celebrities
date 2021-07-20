// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router()
const Celebrity = require("./../models/Celebrity.model")

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body

  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCelebrity) => {
      res.redirect("/celebrities")
    })
    .catch((e) => {
      console.log("There was an error: ", e)
      res.render("celebrities/new-celebrity")
    })
})

module.exports = router
