"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/application/hooks/useAuth";

export default function Navbar() {
    const { state, logout } = useAuth();
    const router = useRouter();
    const isLoggedIn = state.status === "AUTHENTICATED"

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-lg font-bold">
                <Link href="/">MyApp</Link>
            </div>

            <div className="space-x-4 flex items-center">
                <Link href="/">Home</Link>
                <Link href="/documents/list">문서 분석</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/board/list">게시판</Link>

                {/* 구독 버튼 추가 */}
                {isLoggedIn && (
                    <Link href="/payment/checkout">
                        <button className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                            구독
                        </button>
                    </Link>
                )}

                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
