const express = require("express");
const router = express.Router();
const axios = require("axios");
const Poke = require("../../models/Pokemon");

const pokeApiURL = "https://pokeapi.co/api/v2/pokemon";

// get route to pokemon list
router.get("/", (req, res, next) => {
    axios
        .get(`${pokeApiURL}?limit=1000`)
        .then(allPokemon => {
            // console.log({ pokemon: allPokemon.data.results });
            res.render("pokemon/pokemon-list", {
                allPokemon: allPokemon.data.results
            });
        })
        .catch(err => next(err));
});

// get route for the details of the pokemon
router.get("/details/:pokeId", (req, res, next) => {
    // console.log({ params: req.params.pokeId });
    axios
        .get(`${pokeApiURL}/${Number(req.params.pokeId) + 1}`)
        .then(pokemon => {
            console.log({ pokemon });
            res.render("pokemon/pokemon-details", { pokemon: pokemon.data });
        })
        .catch(err => next(err));
});

// post route to create the title with the id of the pokemon for the title
router.post("/create/:pokeId", (req, res, next) => {
    const pokeData = req.body;
    pokeData.id = req.params.pokeId;

    Poke.create(pokeData)
        .then(newlyCreatedPokeTitle => {
            res.redirect("/users/user-lists");
        })
        .catch(err => next(err));
});

module.exports = router;
