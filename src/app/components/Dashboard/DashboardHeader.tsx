'use client';

import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function DashboardHeader() {
    const { user, setUser, setIsLoading } = useUser();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setIsLoading(true);
        router.push('/signin');
    };

    return (
        <header className="border-b border-slate-200 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Sales Dashboard</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Track and analyze your sales performance
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2">
                                    <User className="h-4 w-4 text-slate-600" />
                                    <span className="text-sm font-medium text-slate-700">
                                        {user.name || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/signup"
                                    className="rounded-lg border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href="/signin"
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
