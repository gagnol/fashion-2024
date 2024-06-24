"use client"

import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'

const SalesChart = ({ data }: { data: any[] }) => {
  
  const CustomTooltip = ({ active, payload, label }:any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label bg-slate-500">{`${label} : ${payload[0].value}`}</p>
    
         
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <div className="h-[450px] p-5 rounded-lg shadow-lg border-2 ">
        <h2 className="mb-5 font-medium ">Monthly Sales</h2>  
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
             <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="80%" stopColor="#7480ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7480ff" stopOpacity={0} />
              </linearGradient>
            </defs>
        <Bar
         fillOpacity={1}
          fill="url(#total)" type="monotone" dataKey="sales" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip/>} />
               
      </BarChart>
    </ResponsiveContainer>
    </div>
  )
}

export default SalesChart