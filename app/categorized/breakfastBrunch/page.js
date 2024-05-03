import Image from "next/image";
import { fetchRecipeByCategory } from "@/db/queries";
import Link from "next/link";

export const metadata= {
    title: "Breakfast & Brunch",
    description: "All the recipes related to breakfast."
}

export default async function BreakfastPage() {
    const items = await fetchRecipeByCategory("Breakfast & Brunch");

    return (
        <div>
            <h3 className="font-semibold text-xl">Breakfast & Brunch</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center">
                {items.map((recipe) => (
                    <div key={recipe._id} className="card">
                        <Link href={`/recipes/${recipe._id}`}>
                            <Image
                                src={recipe.thumbnail}
                                className="rounded-md"
                                alt=""
                                width={300}
                                height={160}
                            />
                            <h4 className="my-2">{recipe.name}</h4>
                        </Link>
                        <div className="py-2 flex justify-between text-xs text-gray-500">
                            <span>⭐️ {recipe.rating}</span>
                            <span>By: {recipe.author}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}