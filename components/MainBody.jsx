import Sidebar from "@/components/Sidebar";
import Items from "@/components/Items";

export default function MainBody() {
    return (
        <>
            <section className="container py-8">
                <div className="grid grid-cols-12 py-4">
                    <Sidebar />
                    <Items />
                </div>
            </section>
        </>
    );
}