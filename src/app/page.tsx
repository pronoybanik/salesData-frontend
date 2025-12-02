import { getSalesData } from "@/services/SalesServices";
import DashboardSection from "./components/Dashboard/DashboardSection";

const DashboardPage = async () => {
  const response = await getSalesData();
  
  // Handle error case
  if (response instanceof Error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-xl bg-white p-8 shadow-lg text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-slate-600">{response.message}</p>
        </div>
      </div>
    );
  }

  const initialData = response?.results || { TotalSales: [], Sales: [] };
  const initialPagination = response?.pagination || { before: null, after: null };

  return (
    <div>
      <DashboardSection 
        initialSalesData={initialData}
        initialPagination={initialPagination}
      />
    </div>
  );
}

export default DashboardPage;
