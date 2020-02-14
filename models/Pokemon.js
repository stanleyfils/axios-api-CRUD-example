const mongoose = require("mongoose");

const {
    Schema,
    model
} = mongoose;

const pokeSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    }
}, {
    timestamps: true
});

const Poke = model("Pokemon", pokeSchema);
module.exports = Poke;