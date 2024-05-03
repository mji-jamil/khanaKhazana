"use server";

import { createUser, findUserByCredentials } from "@/db/queries";
import { redirect } from "next/navigation";
import {User} from "@/models/user-model";

async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const created = await createUser(user);
    redirect("/login");
}


async function performLogin(formData) {
    try {
        const credentials = {};
        credentials.email = formData.get("email");
        credentials.password = formData.get("password");
        const found = await findUserByCredentials(credentials);
        return found;
    } catch (error) {
        throw error;
    }

}

export { registerUser, performLogin };