'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface TotalSaleItem {
    totalSale: number;
    day: string;
}

interface ChartSectionProps {
    totalSalesData: TotalSaleItem[];
}

export default function ChartSection({ totalSalesData }: ChartSectionProps) {
    
    const chartData = totalSalesData.map((item) => ({
        date: new Date(item.day).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        }),
        totalSale: item.totalSale,
    }));

    return (
        <div className="mb-8 rounded-xl bg-white p-4 shadow-md sm:p-6">
            <div className="mb-4 flex  gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Sales Over Time</h2>
                    <p className="text-xs text-slate-600 sm:text-sm">Daily total sales trend</p>
                </div>
            </div>

            <div className="h-64 sm:h-80">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 10,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis
                                dataKey="date"
                                stroke="#64748b"
                                fontSize={11}
                                tickLine={false}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis
                                stroke="#64748b"
                                fontSize={11}
                                tickLine={false}
                                tickFormatter={(value: number) => `$${value}`}
                                width={50}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    fontSize: '12px',
                                }}
                                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Total Sales']}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Line
                                type="monotone"
                                dataKey="totalSale"
                                stroke="#6366f1"
                                strokeWidth={2}
                                dot={{ fill: '#6366f1', strokeWidth: 2, r: 3 }}
                                activeDot={{ r: 5 }}
                                name="Total Sales"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-slate-500 sm:text-base">No sales data available</p>
                    </div>
                )}
            </div>
        </div>
    );
}
