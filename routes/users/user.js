const express = require("express");
const router = express.Router();
const Poke = require("../../models/Pokemon");
const axios = require("axios");
const pokeApiURL = "https://pokeapi.co/api/v2/pokemon";

// list of users titles for pokemon
router.get("/user-lists", (req, res, next) => {
    Poke.find()
        .then(allTitles => {
            res.render("users/lists", { allTitles });
        })
        .catch(err => next(err));
});

// title details route
router.get("/title-details/:titleId", (req, res, next) => {
    Poke.findById(req.params.titleId)
        .then(theTitleFromDB => {
            axios
                .get(`${pokeApiURL}/${theTitleFromDB.id}`)
                .then(pokemonFromAPI => {
                    const data = {
                        title: theTitleFromDB,
                        pokemon: pokemonFromAPI.data
                    };

                    // console.log({ data });
                    res.render("users/title-details", data);
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

// the update route for the title
router.post("/update/:titleId", (req, res, next) => {
    Poke.findByIdAndUpdate(
        req.params.titleId,
        { title: req.body.title },
        { new: true }
    )
        .then(updatedTitle => {
            res.redirect(`/users/title-details/${updatedTitle._id}`);
        })
        .catch(err => next(err));
});

// router to delete the title created by the user
router.post("/delete/:titleId", (req, res, next) => {
    Poke.findByIdAndDelete(req.params.titleId)
        .then(() => {
            res.redirect("back");
        })
        .catch(err => next(err));
});

module.exports = router;
