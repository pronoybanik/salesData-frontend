'use client';

import { SalesDataResponse } from '@/types/SalesType';
import { DollarSign } from 'lucide-react';

type StatsCardProps = {
    salesData?: SalesDataResponse;
};
const StatsCard = ({ salesData }: StatsCardProps) => {
    // Calculate total sales from TotalSales array
    const totalSalesAmount = salesData?.TotalSales?.reduce((sum: number, item: { totalSale: number; day: string }) => sum + (item.totalSale || 0), 0) || 0;

    // Calculate total orders from Sales array
    const totalOrders = salesData?.Sales?.length || 0;

    // Calculate average order value
    const averageOrder = totalOrders > 0 ? totalSalesAmount / totalOrders : 0;

    return (
        <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-600">Total Sales</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            ${totalSalesAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            {salesData?.TotalSales?.length || 0} days with sales
                        </p>
                    </div>
                    <div className="rounded-full bg-indigo-100 p-3">
                        <DollarSign className="h-6 w-6 text-indigo-600" />
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-600">Total Orders</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {totalOrders.toLocaleString('en-US')}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Individual transactions
                        </p>
                    </div>
                    <div className="rounded-full bg-green-100 p-3">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-600">Average Order</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            ${averageOrder.toFixed(2)}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Per transaction
                        </p>
                    </div>
                    <div className="rounded-full bg-purple-100 p-3">
                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default StatsCard;
