"use server"

import { SalesFilters } from "@/types/SalesType";


export const getSalesData = async (filters?: SalesFilters) => {
    try {
        const params = new URLSearchParams();
        
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        if (filters?.priceMin) params.append('priceMin', filters.priceMin);
        if (filters?.email) params.append('email', filters.email);
        if (filters?.phone) params.append('phone', filters.phone);
        if (filters?.sortBy) params.append('sortBy', filters.sortBy);
        if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
        if (filters?.before) params.append('before', filters.before);
        if (filters?.after) params.append('after', filters.after);

        const queryString = params.toString();
        const url = `${process.env.NEXT_PUBLIC_BASE_API}/sales${queryString ? `?${queryString}` : ''}`;
        
        const res = await fetch(url, {
            cache: "force-cache",
            next: { revalidate: 0 }
        });
        
        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        
        const result = await res.json();
        return result;

    } catch (error: unknown) {
        console.error('Error fetching sales data:', error);
        return error instanceof Error ? error : new Error(String(error));
    }
}

