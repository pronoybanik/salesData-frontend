'use client';

import { useReducer, useEffect, useTransition } from 'react';
import { getSalesData } from '@/services/SalesServices';
import SalesTable from './SalesTable';
import FilterSection from './FilterSection';
import StatsCards from './StatsCards';
import DashboardHeader from './DashboardHeader';
import ChartSection from './ChartSection';
import { DashboardSectionProps, SalesDataResponse, SortDirection } from '@/types/SalesType';

// Define state type
interface DashboardState {
    dateFrom: string;
    dateTo: string;
    minPrice: string;
    customerEmail: string;
    phoneNumber: string;
    sortBy: { field: 'date' | 'price' | null; direction: SortDirection };
    salesData: SalesDataResponse;
    isLoading: boolean;
    pagination: {
        before: string | null;
        after: string | null;
        hasMore?: boolean;
    };
    currentPage: number;
}

// Define action types
type DashboardAction =
    | { type: 'SET_DATE_FROM'; payload: string }
    | { type: 'SET_DATE_TO'; payload: string }
    | { type: 'SET_MIN_PRICE'; payload: string }
    | { type: 'SET_CUSTOMER_EMAIL'; payload: string }
    | { type: 'SET_PHONE_NUMBER'; payload: string }
    | { type: 'SET_SORT_BY'; payload: { field: 'date' | 'price' | null; direction: SortDirection } }
    | { type: 'SET_SALES_DATA'; payload: SalesDataResponse }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_PAGINATION'; payload: { before: string | null; after: string | null; hasMore?: boolean } }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'INCREMENT_PAGE' }
    | { type: 'DECREMENT_PAGE' }
    | { type: 'CLEAR_FILTERS' };

// Reducer function
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
    switch (action.type) {
        case 'SET_DATE_FROM':
            return { ...state, dateFrom: action.payload };
        case 'SET_DATE_TO':
            return { ...state, dateTo: action.payload };
        case 'SET_MIN_PRICE':
            return { ...state, minPrice: action.payload };
        case 'SET_CUSTOMER_EMAIL':
            return { ...state, customerEmail: action.payload };
        case 'SET_PHONE_NUMBER':
            return { ...state, phoneNumber: action.payload };
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.payload };
        case 'SET_SALES_DATA':
            return { ...state, salesData: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_PAGINATION':
            return { ...state, pagination: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'INCREMENT_PAGE':
            return { ...state, currentPage: state.currentPage + 1 };
        case 'DECREMENT_PAGE':
            return { ...state, currentPage: state.currentPage - 1 };
        case 'CLEAR_FILTERS':
            return {
                ...state,
                dateFrom: '',
                dateTo: '',
                minPrice: '',
                customerEmail: '',
                phoneNumber: '',
                sortBy: { field: null, direction: null },
                currentPage: 1,
            };
        default:
            return state;
    }
};

const DashboardSection = ({ initialSalesData, initialPagination }: DashboardSectionProps) => {
    // Initialize state with useReducer
    const [state, dispatch] = useReducer(dashboardReducer, {
        dateFrom: '',
        dateTo: '',
        minPrice: '',
        customerEmail: '',
        phoneNumber: '',
        sortBy: { field: null, direction: null },
        salesData: initialSalesData,
        isLoading: false,
        pagination: initialPagination || {
            before: null,
            after: null,
            hasMore: true,
        },
        currentPage: 1,
    });

    const [, startTransition] = useTransition();

    const fetchFilteredData = async (paginationToken?: { before?: string; after?: string }) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const filters = {
                startDate: state.dateFrom || undefined,
                endDate: state.dateTo || undefined,
                priceMin: state.minPrice || undefined,
                email: state.customerEmail || undefined,
                phone: state.phoneNumber || undefined,
                sortBy: state.sortBy.field || undefined,
                sortOrder: state.sortBy.direction || undefined,
                before: paginationToken?.before || undefined,
                after: paginationToken?.after || undefined,
            };

            const result = await getSalesData(filters);

            if (result && !(result instanceof Error)) {
                dispatch({ type: 'SET_SALES_DATA', payload: result.results || { TotalSales: [], Sales: [] } });

                // Update pagination state from API response
                if (result.pagination) {
                    dispatch({
                        type: 'SET_PAGINATION',
                        payload: {
                            before: result.pagination.before || null,
                            after: result.pagination.after || null,
                            hasMore: result.pagination.hasMore ?? true,
                        },
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch filtered data:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    useEffect(() => {
        if (state.sortBy.field && state.sortBy.direction) {
            startTransition(() => {
                fetchFilteredData();
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.sortBy]);

    const handleSort = (field: 'date' | 'price') => {
        const prev = state.sortBy;
        if (prev.field === field) {
            if (prev.direction === 'asc') {
                dispatch({ type: 'SET_SORT_BY', payload: { field, direction: 'desc' } });
            } else if (prev.direction === 'desc') {
                dispatch({ type: 'SET_SORT_BY', payload: { field: null, direction: null } });
            }
        } else {
            dispatch({ type: 'SET_SORT_BY', payload: { field, direction: 'asc' } });
        }
    };

    const handleApplyFilters = () => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
        startTransition(() => {
            fetchFilteredData();
        });
    };

    const handleNextPage = () => {
        if (state.pagination.after) {
            dispatch({ type: 'INCREMENT_PAGE' });
            startTransition(() => {
                fetchFilteredData({ after: state.pagination.after! });
            });
        }
    };

    const handlePreviousPage = () => {
        if (state.currentPage > 1 && state.pagination.before) {
            dispatch({ type: 'DECREMENT_PAGE' });
            startTransition(() => {
                fetchFilteredData({ before: state.pagination.before! });
            });
        }
    };

    // clear filtering system
    const handleClearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' });

        // Fetch data without filters
        startTransition(async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const result = await getSalesData();
                if (result && !(result instanceof Error)) {
                    dispatch({ type: 'SET_SALES_DATA', payload: result.results || { TotalSales: [], Sales: [] } });
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        });
    };

    // Transform API data to component format
    const transformedSalesData = state.salesData?.Sales?.map((sale) => ({
        id: sale._id,
        date: new Date(sale.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }),
        customerName: sale.customerEmail?.split('@')[0] || 'Unknown',
        email: sale.customerEmail || 'N/A',
        phone: sale.customerPhone || 'N/A',
        amount: sale.price || 0,
        status: 'Completed',
    })) || [];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
            <DashboardHeader />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {state.isLoading && (
                    <div className="mb-4 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
                        <div className="flex items-center gap-2">
                            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Loading sales data...
                        </div>
                    </div>
                )}

                <StatsCards salesData={state.salesData} />

                <ChartSection totalSalesData={state.salesData?.TotalSales || []} />

                <FilterSection
                    dateFrom={state.dateFrom}
                    dateTo={state.dateTo}
                    minPrice={state.minPrice}
                    customerEmail={state.customerEmail}
                    phoneNumber={state.phoneNumber}
                    onDateFromChange={(value) => dispatch({ type: 'SET_DATE_FROM', payload: value })}
                    onDateToChange={(value) => dispatch({ type: 'SET_DATE_TO', payload: value })}
                    onMinPriceChange={(value) => dispatch({ type: 'SET_MIN_PRICE', payload: value })}
                    onCustomerEmailChange={(value) => dispatch({ type: 'SET_CUSTOMER_EMAIL', payload: value })}
                    onPhoneNumberChange={(value) => dispatch({ type: 'SET_PHONE_NUMBER', payload: value })}
                    onApplyFilters={handleApplyFilters}
                    onClearFilters={handleClearFilters}
                />

                <SalesTable
                    sortBy={state.sortBy}
                    onSort={handleSort}
                    salesData={transformedSalesData}
                    currentPage={state.currentPage}
                    hasNextPage={state.pagination.hasMore !== false && !!state.pagination.after}
                    hasPreviousPage={state.currentPage > 1 && !!state.pagination.before}
                    onNextPage={handleNextPage}
                    onPreviousPage={handlePreviousPage}
                />
            </main>
        </div>
    );
}

export default DashboardSection;
