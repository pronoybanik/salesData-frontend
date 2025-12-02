
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Filter, Calendar, DollarSign, Mail, Phone, ArrowUpDown } from 'lucide-react';

type SortDirection = 'asc' | 'desc' | null;

export default function DashboardPage() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sortBy, setSortBy] = useState<{ field: 'date' | 'price' | null; direction: SortDirection }>({
    field: null,
    direction: null,
  });

  const handleSort = (field: 'date' | 'price') => {
    setSortBy((prev) => {
      if (prev.field === field) {
        if (prev.direction === 'asc') return { field, direction: 'desc' };
        if (prev.direction === 'desc') return { field: null, direction: null };
      }
      return { field, direction: 'asc' };
    });
  };

  const getSortIcon = (field: 'date' | 'price') => {
    if (sortBy.field !== field) return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    if (sortBy.direction === 'asc') return <ChevronUp className="h-4 w-4 text-indigo-600" />;
    if (sortBy.direction === 'desc') return <ChevronDown className="h-4 w-4 text-indigo-600" />;
    return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
  };

  // Mock data for design purposes
  const mockSalesData = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    date: '2024-12-01',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    amount: 1250.00,
    status: 'Completed',
  }));

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      {/* Header */}
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
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters Section */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Date Range */}
            <div className="col-span-full grid gap-4 md:col-span-2 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  End Date
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Minimum Price */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <DollarSign className="h-4 w-4 text-slate-500" />
                Minimum Price
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Customer Email */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail className="h-4 w-4 text-slate-500" />
                Customer Email
              </label>
              <input
                type="email"
                placeholder="customer@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Phone className="h-4 w-4 text-slate-500" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <Search className="h-4 w-4" />
              Apply Filters
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
              Clear All
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Sales</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">$125,430</p>
                <p className="mt-1 text-sm text-green-600">↑ 12% from last month</p>
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
                <p className="mt-2 text-3xl font-bold text-slate-900">1,234</p>
                <p className="mt-1 text-sm text-green-600">↑ 8% from last month</p>
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
                <p className="mt-2 text-3xl font-bold text-slate-900">$101.65</p>
                <p className="mt-1 text-sm text-red-600">↓ 3% from last month</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Sales Over Time</h2>
              <p className="text-sm text-slate-600">Total sales trend for the selected period</p>
            </div>
            <select className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Custom Range</option>
            </select>
          </div>

          {/* Chart Placeholder */}
          <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-slate-700">Time-Series Chart</p>
              <p className="mt-1 text-xs text-slate-500">Line chart will be displayed here</p>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className="rounded-xl bg-white shadow-md">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Sales Transactions</h2>
                <p className="text-sm text-slate-600">Showing 50 items per page</p>
              </div>
              <div className="text-sm text-slate-600">
                Total: <span className="font-semibold text-slate-900">1,234 sales</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    <div className="flex items-center gap-2">
                      Date
                      <button
                        onClick={() => handleSort('date')}
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
                        onClick={() => handleSort('price')}
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
                {mockSalesData.map((sale) => (
                  <tr key={sale.id} className="transition hover:bg-slate-50">
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
                Showing <span className="font-semibold text-slate-900">1</span> to{' '}
                <span className="font-semibold text-slate-900">50</span> of{' '}
                <span className="font-semibold text-slate-900">1,234</span> results
              </div>
              <div className="flex gap-2">
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronDown className="h-4 w-4 rotate-90" />
                  Previous
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                  Next
                  <ChevronUp className="h-4 w-4 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
