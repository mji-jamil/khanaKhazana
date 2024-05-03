import {fetchRecipeById} from "@/db/queries";

export default async function RecipeProcedure({id}) {
    const recipe = await fetchRecipeById(id);
    return (
        <>
            <section>
                <div className="container py-12">
                    <h3 className="font-semibold text-xl py-6">How to Make it</h3>
                    <div>
                        {recipe?.steps?.map((step, index) => (
                            <div key={index} className="step">
                                <h3>Step {index + 1}</h3>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}