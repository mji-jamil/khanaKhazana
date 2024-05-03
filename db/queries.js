import User from "@/models/user-model";
import { replaceMongoIdInObject } from "@/utils/data-utils";
import Recipe from "@/models/recipe-model";
import dbConnect from "@/services/mongo";
import mongoose from "mongoose";

async function createUser(user) {
    return await User.create(user);
}

async function findUserByCredentials(credentials) {
    const user = await User.findOne(credentials).lean();
    if (user) {
        return replaceMongoIdInObject(user);
    }
    return null;
}

async function fetchRecipes() {
    try {
        const recipes = await Recipe.find();
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}

async function fetchRecipeByCategory(category) {
    try {
        const recipes = await Recipe.find({ category });
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes by category:", error);
        return [];
    }
}

async function fetchRecipeById(id) {
    try {
        const recipe = await Recipe.findById(id);
        return recipe;
    } catch (error) {
        console.error("Error fetching recipe by ID:", error);
        return null;
    }
}

async function updateFav(recipeId, authId) {
    try {
        const user = await User.findById(authId);

        if (!user) {
            console.error("User not found");
            return;
        }

        const recipeIndex = user.favourites.indexOf(recipeId);
        if (recipeIndex !== -1) {
            user.favourites.splice(recipeIndex, 1);
            console.log("Recipe removed from favourites");
        } else {
            user.favourites.push(recipeId);
            console.log("Recipe added to favourites");
        }

        await user.save();
        console.log("User favorites updated successfully");
    } catch (error) {
        console.error("Error updating user favourites:", error);
    }
}

export {
    createUser,
    findUserByCredentials,
    fetchRecipes,
    fetchRecipeByCategory,
    fetchRecipeById,
    updateFav,
};