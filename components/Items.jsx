import {fetchRecipes} from "@/db/queries";
import Image from "next/image";
import Link from "next/link";

export default async function Items() {

    const recipes = await fetchRecipes();
    // console.log(recipes);

    return (
        <>
            <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8 justify-items-center">
                    {recipes.map(recipe => (
                        <div key={recipe._id} className="card">
                            <Link href={`/recipes/${recipe._id}`}>
                                <Image src={recipe?.thumbnail} className="rounded-md" alt="" width={300} height={160}/>
                                <h4 className="my-2">{recipe?.name}</h4>
                            </Link>
                            {/*<Image src={recipe.thumbnail} className="rounded-md" alt="" width={300} height={160}/>*/}
                            {/*<h4 className="my-2">{recipe.name}</h4>*/}
                            <div className="py-2 flex justify-between text-xs text-gray-500">
                                <span>⭐️ {recipe.rating}</span>
                                <span>By: {recipe.author}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}