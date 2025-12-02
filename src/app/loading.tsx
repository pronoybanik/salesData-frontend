export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
            <div className="relative">
                <div className="h-24 w-24 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 animate-pulse rounded-full bg-indigo-600 opacity-20"></div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-indigo-600"></div>
                </div>
            </div>

            <div className="absolute mt-32">
                <p className="animate-pulse text-sm font-medium text-slate-600">Loading...</p>
            </div>
        </div>
    );
}