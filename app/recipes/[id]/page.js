import RecipeHeader from "@/components/singleRecipe/RecipeHeader";
import RecipeProcedure from "@/components/singleRecipe/RecipeProcedure";
import { fetchRecipeById } from "@/db/queries";
import { Suspense } from "react";

export async function generateMetadata({ params, searchParams }, parent) {
    const id = params.id;

    const product = await fetchRecipeById(id);

    return {
        title: product?.name.slice(0, 100),
        description: product?.description.slice(0, 100),
        openGraph: {
            type: "website",
            url: `https://khana-khazana-mji.vercel.app/recipes/${id}`,
            title: product?.name,
            description: product?.description,
            images: [
                {
                    url: product?.thumbnail,
                    width: 1200,
                    height: 600,
                    alt: product?.name || "Recipe Image",
                },
            ],
            site_name: "Khana Khazana",
        },
    };
}

export default async function Page({ params: { id } }) {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <RecipeHeader id={id} />
                <RecipeProcedure id={id} />
            </Suspense>
        </>
    );
}