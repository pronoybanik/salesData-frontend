'use client';

import { SalesTableProps } from '@/types/SalesType';
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';


export default function SalesTable({
    sortBy,
    onSort,
    salesData,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    onNextPage,
    onPreviousPage
}: SalesTableProps) {
    const getSortIcon = (field: 'date' | 'price') => {
        if (sortBy.field !== field) return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
        if (sortBy.direction === 'asc') return <ChevronUp className="h-4 w-4 text-indigo-600" />;
        if (sortBy.direction === 'desc') return <ChevronDown className="h-4 w-4 text-indigo-600" />;
        return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    };

    return (
        <div className="rounded-xl bg-white shadow-md">
            <div className="border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">Sales Transactions</h2>
                        <p className="text-sm text-slate-600">Showing 50 items per page</p>
                    </div>
                    <div className="text-sm text-slate-600">
                        Total: <span className="font-semibold text-slate-900">{salesData.length} sales</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                <div className="flex items-center gap-2">
                                    Date
                                    <button
                                        onClick={() => onSort('date')}
                                        className="rounded p-1 transition hover:bg-slate-200"
                                    >
                                        {getSortIcon('date')}
                                    </button>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                Customer Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                <div className="flex items-center gap-2">
                                    Amount
                                    <button
                                        onClick={() => onSort('price')}
                                        className="rounded p-1 transition hover:bg-slate-200"
                                    >
                                        {getSortIcon('price')}
                                    </button>
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {salesData.map((sale, index) => (
                            <tr key={sale.id} className="transition hover:bg-slate-50">
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                                    {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-900">
                                    {sale.date}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                    {sale.customerName}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {sale.email}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                                    {sale.phone}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                                    ${sale.amount.toFixed(2)}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                                        {sale.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">
                        Page <span className="font-semibold text-slate-900">{currentPage}</span>{' '}
                        <span className="text-slate-500">({salesData.length} items)</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={onPreviousPage}
                            disabled={!hasPreviousPage}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ChevronDown className="h-4 w-4 rotate-90" />
                            Previous
                        </button>
                        <button
                            onClick={onNextPage}
                            disabled={!hasNextPage}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                            <ChevronUp className="h-4 w-4 -rotate-90" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
