'use client';

import { FilterSectionProps } from '@/types/SalesType';
import { Calendar, DollarSign, Mail, Phone, Search, Filter } from 'lucide-react';



export default function FilterSection({
  dateFrom,
  dateTo,
  minPrice,
  customerEmail,
  phoneNumber,
  onDateFromChange,
  onDateToChange,
  onMinPriceChange,
  onCustomerEmailChange,
  onPhoneNumberChange,
  onApplyFilters,
  onClearFilters,
}: FilterSectionProps) {
  return (
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
              onChange={(e) => onDateFromChange(e.target.value)}
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
              onChange={(e) => onDateToChange(e.target.value)}
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
            onChange={(e) => onMinPriceChange(e.target.value)}
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
            onChange={(e) => onCustomerEmailChange(e.target.value)}
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
            onChange={(e) => onPhoneNumberChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onApplyFilters}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Search className="h-4 w-4" />
          Apply Filters
        </button>
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
