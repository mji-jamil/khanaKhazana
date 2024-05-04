"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { updateFav, fetchUser } from "@/db/queries";

const Favourite = ({ recipeId }) => {
    const { auth } = useAuth();
    const router = useRouter();
    const [isFavourite, setIsFavourite] = useState(false);

    const checkFavouriteStatus = async () => {
        if (auth) {
            try {
                const user = await fetchUser(auth.id);
                setIsFavourite(user?.favourites.includes(recipeId));
            } catch (error) {
                console.error("Error checking favourite status:", error);
            }
        }
    };

    const toggleFavourite = async () => {
        if (!auth) {
            router.push(`/login`);
            return;
        }
        try {
            await checkFavouriteStatus(); // Fetch user's favourites
            if (isFavourite) {
                await updateFav(recipeId, auth.id, "remove");
            } else {
                await updateFav(recipeId, auth.id, "add");
            }
            setIsFavourite(!isFavourite); // Toggle favourite status
        } catch (error) {
            console.error("Error toggling favourite:", error);
        }
    };

    return (
        <div
            className="flex gap-2 text-gray-600 cursor-pointer hover:text-[#eb4a36]"
            onClick={toggleFavourite}
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
                className={`icon icon-tabler icons-tabler-outline icon-tabler-heart ${
                    isFavourite ? "text-red-500" : ""
                }`}
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
            <span>{isFavourite ? "Unfavourite" : "Favourite"}</span>
        </div>
    );
};

export default Favourite;