"use client"


import { Text } from '@radix-ui/themes';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, 
  Tooltip, LineChart, Line } from 'recharts'

const SalesChart = ({ data }: { data: { month: string, data: any[] }} ) => {
    
 
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
        <h2 className="mb-5 font-medium ">Daily Sales</h2>
        <div className='w-full text-center mb-2'>
        <Text size="6">{data.month}</Text>
        </div> 
        <ResponsiveContainer width="100%" height={300}>
        <LineChart className='w-full h-full' data={data.data} margin={{ top: 5, right:20, bottom: 5, left:0 }}>
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip content={<CustomTooltip/>}/>
      </LineChart>
    </ResponsiveContainer>
    </div>
  )
}

export default SalesChart