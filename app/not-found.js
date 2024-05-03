"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();
    const locale = pathname.split("/")[1];
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-4 text-red-400">Page Not Found</h2>
            <p className="text-gray-800 mb-8 text-xl">
                Sorry, the page {pathWithoutLocale} you are looking for does not
                exist.
            </p>
            <Link
                href="/"
                className="text-primary hover:underline text-2xl font-bold text-teal-400"
            >
                Return Home
            </Link>
        </div>
    );
}