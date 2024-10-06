import dbConnect from "@/lib/db-connect";
import OrderModel from "@/lib/order-model";

/* graphics */
export const getSalesPerMonth = async () => {
  await dbConnect();
  
  const currentYear = new Date().getFullYear();
  
  // Fetch orders from the current year
  const orders = await OrderModel.find({
    createdAt: {
      $gte: new Date(`${currentYear}-01-01`),
      $lte: new Date(`${currentYear}-12-31`)
    }
  });

  const salesPerMonth = orders.reduce((acc: any[], order: { createdAt: string | number | Date; totalAmount: number; }) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 for January --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + (order.totalAmount / 100);
    return acc;
  }, {});

  // Generate graph data for each month
  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i));
    return { name: month, sales: salesPerMonth[i] || 0 };
  });

  return graphData;
};
  
  /*daily  graphics */
  export const getSalesPerDay = async () => {
    await dbConnect();
  
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 for January --> 11 for December
    const currentYear = now.getFullYear();
  
    // Fetch orders from the current month and year
    const orders = await OrderModel.find({
      createdAt: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lte: new Date(currentYear, currentMonth + 1, 0) // Last day of the current month
      }
    });
  
    // Get the full name of the current month
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth));
  
    // Group orders by day of the month
    const salesPerDay = orders.reduce((acc: any[], order: { createdAt: string | number | Date; totalAmount: number; }) => {
      const day = new Date(order.createdAt).getDate(); // Day of the month (1-31)
      acc[day] = (acc[day] || 0) + (order.totalAmount / 100);
      return acc;
    }, {});
  
    // Generate an array of daily sales data for the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const graphData = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1; // Days start from 1
      return { name: `${day}`, sales: salesPerDay[day] || 0 };
    });
  
    return { month: monthName, data: graphData };
  };
  


  export const getSalesPerYear = async () => {
    await dbConnect()
  
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    
    // Year-to-date sales for the current year
    const currentYearSales = await OrderModel.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date()
          }
        }
      },
      {
        $group: {
          _id: currentYear,
          totalSales: { $sum: '$totalAmount' },
        }
      }
    ]);
    
    // Year-to-date sales for the previous year
    const previousYearSales = await OrderModel.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(`${previousYear}-01-01`),
            $lte: new Date(`${previousYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: previousYear,
          totalSales: { $sum: '$totalAmount' },
        }
      }
    ]);
    
    // Format the sales data
    const formattedCurrentYearSales = currentYearSales[0]?.totalSales / 100 || 0;
    const formattedPreviousYearSales = previousYearSales[0]?.totalSales / 100 || 0;
    
    // Return the sales data as a response
    return ({
      currentYear: currentYear,
      currentYearSales: formattedCurrentYearSales,
      previousYear: previousYear,
      previousYearSales: formattedPreviousYearSales
    });
    
  }