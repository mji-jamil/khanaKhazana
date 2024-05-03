import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import dbConnect from "@/services/mongo";

const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata = {
    title: "Khana Khazana",
    description:
        "Explore Khana Khazana and discover a world of gourmet recipes that cater to your taste and cravings. From traditional favorites to modern twists, find everything to satisfy your culinary desires.",
};

export default async function RootLayout({ children }) {
    await dbConnect();
    return (
        <html lang="en">
            <AuthProvider>
                <body style={{ fontFamily: `${poppins.family},  sans-serif` }}>
                    <Navbar />
                    {children}
                </body>
            </AuthProvider>
        </html>
    );
}