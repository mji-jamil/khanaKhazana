"use client"

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from 'next/navigation';
import {updateFav} from "@/db/queries";
import dbConnect from "@/services/mongo";

const Favourite = ({ recipeId }) => {
    const { auth } = useAuth();
    const router = useRouter();

    const addToFavourites = async () => {
        if (!auth) {
            router.push(`/login`);
            return;
        }
        try {
            await dbConnect();
            await updateFav(recipeId, auth?._id);
        } catch (error) {
            console.error("Error adding recipe to favourites:", error);
        }
    };

    return (
        <div
            className="flex gap-2 text-gray-600 cursor-pointer hover:text-[#eb4a36]"
            onClick={addToFavourites}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <span>Favourite</span>
        </div>
    );
};

export default Favourite;