"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
    const { auth } = useAuth();
    return (
        <>
            <nav>
                <div className="container flex justify-between py-6">
                    <Link href={"/"}>
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={122}
                            height={1222}
                        />
                    </Link>

                    <ul className="flex gap-4 text-sm text-gray-500">
                        <li className="py-2 active">
                            <Link href={"/"}>Home</Link>
                        </li>

                        <li className="py-2">
                            <Link href={"/recipe"}>Recipe</Link>
                        </li>

                        <li className="py-2">
                            <Link href={"/about"}>About us</Link>
                        </li>

                        <li className="py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center">
                            {auth ? (
                                auth.firstName
                            ) : (
                                <Link href={"/login"}>Login</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}