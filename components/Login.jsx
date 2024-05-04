"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { performLogin } from "@/actions";

export default function Login() {
    const [error, setError] = useState(false);
    const router = useRouter();
    const { setAuth } = useAuth();

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const found = await performLogin(formData);
            if (found) {
                setAuth(found);
                router.push("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            {error && <div className="my-2 text-red-500">{error}</div>}
            <form className="login-form" id="login-form" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email"  required/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required/>
                </div>

                <button
                    type="submit"
                    className="bg-[#eb4a36] py-3 rounded-md text-white w-full mt-4"
                >
                    Login
                </button>
            </form>
        </>
    );
}