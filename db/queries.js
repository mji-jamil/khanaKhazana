"use server";
import User from "@/models/user-model";
import { replaceMongoIdInObject } from "@/utils/data-utils";
import Recipe from "@/models/recipe-model";
import dbConnect from "@/services/mongo";

async function createUser(user) {
    await dbConnect();
    return await User.create(user);
}

async function findUserByCredentials(credentials) {
    await dbConnect();
    const user = await User.findOne(credentials).lean();
    if (user) {
        return replaceMongoIdInObject(user);
    }
    return null;
}

async function fetchRecipes() {
    await dbConnect();
    try {
        const recipes = await Recipe.find();
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}

async function fetchRecipeByCategory(category) {
    await dbConnect();
    try {
        const recipes = await Recipe.find({ category });
        return recipes;
    } catch (error) {
        console.error("Error fetching recipes by category:", error);
        return [];
    }
}

async function fetchRecipeById(id) {
    await dbConnect();
    try {
        const recipe = await Recipe.findById(id);
        return recipe;
    } catch (error) {
        console.error("Error fetching recipe by ID:", error);
        return null;
    }
}

async function updateFav(recipeId, authId) {
    await dbConnect();
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


async function fetchUser(userId) {
    try {
        const user = await User.findById(userId).lean();
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export {
    createUser,
    findUserByCredentials,
    fetchRecipes,
    fetchRecipeByCategory,
    fetchRecipeById,
    updateFav,
    fetchUser
};