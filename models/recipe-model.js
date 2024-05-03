import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    activeTime: {
        type: String,
        required: true,
    },
    totalTime: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    serves: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    steps: {
        type: [String],
        required: true,
    },
});

const Recipe = mongoose?.models?.Recipe ?? mongoose.model("Recipe", recipeSchema);

export default Recipe;