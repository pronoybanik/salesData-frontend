export interface SaleItem {
    _id: string;
    date: string;
    price: number;
    customerEmail: string;
    customerPhone: string;
    __v: number;
}

export interface TotalSaleItem {
    totalSale: number;
    day: string;
}

export  interface SalesDataResponse {
    TotalSales: TotalSaleItem[];
    Sales: SaleItem[];
}

export  type SortDirection = 'asc' | 'desc' | null;

export  interface DashboardSectionProps {
    initialSalesData: SalesDataResponse;
    initialPagination?: {
        before: string | null;
        after: string | null;
    };
}

export interface SalesTableProps {
    sortBy: { field: 'date' | 'price' | null; direction: SortDirection };
    onSort: (field: 'date' | 'price') => void;
    salesData: Array<{
        id: string | number;
        date: string;
        customerName: string;
        email: string;
        phone: string;
        amount: number;
        status: string;
    }>;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onNextPage: () => void;
    onPreviousPage: () => void;
}

export interface FilterSectionProps {
  dateFrom: string;
  dateTo: string;
  minPrice: string;
  customerEmail: string;
  phoneNumber: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onCustomerEmailChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
};

export interface SalesFilters {
  startDate?: string;
  endDate?: string;
  priceMin?: string;
  email?: string;
  phone?: string;
  sortBy?: 'date' | 'price';
  sortOrder?: 'asc' | 'desc';
  before?: string;
  after?: string;
}
