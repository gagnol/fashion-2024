"use client"
import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const MonthlySales = ({ salesData }: any) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);

    const handleMonthChange = (month: number) => {
      setSelectedMonth(month);
    };

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
      };

    const currentSales = salesData.find((sale: { month: number; year: number; }) => sale.month === selectedMonth && sale.year === selectedYear);

    // Find previous month and year
    let previousMonth = selectedMonth - 1;
    let previousYear = selectedYear;

    if (previousMonth === 0) {
        previousMonth = 12;
        previousYear = selectedYear - 1;
    }

    const previousSales = salesData.find((sale: { month: number; year: number; }) => sale.month === previousMonth && sale.year === previousYear);

    // Calculate percentage variation
    let percentageVariation = 0;
    if (previousSales && currentSales) {
        percentageVariation = ((currentSales.totalSales - previousSales.totalSales) / previousSales.totalSales) * 100;
    }

    return (
        <Card className="w-full border-2 shadow-xl py-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className=" text-sm font-medium text-[#8A8A8A]">
                Month to Date
            </CardTitle>
            <span>
			<svg
					width="28"
					height="28"
					viewBox="0 0 25 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
		    <path
			d="M22.6003 10.9699V13.03C22.6003 13.58 22.1603 14.0299 21.6003 14.0499H19.6403C18.5603 14.0499 17.5703 13.2599 17.4803 12.1799C17.4203 11.5499 17.6603 10.9599 18.0803 10.5499C18.4503 10.1699 18.9603 9.94995 19.5203 9.94995H21.6003C22.1603 9.96995 22.6003 10.4199 22.6003 10.9699Z"
			fill="#121212"
			/>
			<path
			opacity="0.4"
			d="M18.0801 10.55C17.6601 10.96 17.4201 11.55 17.4801 12.18C17.5701 13.26 18.5601 14.05 19.6401 14.05H21.6001V15.5C21.6001 18.5 19.6001 20.5 16.6001 20.5H7.6001C4.6001 20.5 2.6001 18.5 2.6001 15.5V8.5C2.6001 5.78 4.2401 3.88 6.7901 3.56C7.0501 3.52 7.3201 3.5 7.6001 3.5H16.6001C16.8601 3.5 17.1101 3.50999 17.3501 3.54999C19.9301 3.84999 21.6001 5.76 21.6001 8.5V9.95001H19.5201C18.9601 9.95001 18.4501 10.17 18.0801 10.55Z"
			fill="#121212"
			/>
			<path
			d="M13.6001 9.75H7.6001C7.1901 9.75 6.8501 9.41 6.8501 9C6.8501 8.59 7.1901 8.25 7.6001 8.25H13.6001C14.0101 8.25 14.3501 8.59 14.3501 9C14.3501 9.41 14.0101 9.75 13.6001 9.75Z"
			fill="#121212"
			/>
			</svg>
			</span>
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-[700] text-[#6649B6]">
               ${currentSales?.totalSales || 0}
                </div>
                <Flex my="4">
                    <Text size="2" className='p-[2px]'>{new Date(0, selectedMonth - 1).toLocaleString('en-US', { month: 'long' })} </Text>
                  &nbsp;
                    <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button  variant="surface" size="1">
                        Month
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="2">
                    {[...Array(12)].map((_, index) => (
                        <DropdownMenu.Item
                            shortcut="⌘"
                            key={index}
                            onSelect={() => handleMonthChange(index + 1)}
                        >
                            {new Date(0, index).toLocaleString('en-US', { month: 'long' })}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
                </Flex>
                <div className="flex items-center">
                <Text size="1"> Prior Month</Text>
                        <p className="text-lg">{percentageVariation.toFixed(2)}%</p>
                        {percentageVariation > 0 ? (
                         <Button variant='ghost' color='jade'> <FaArrowUp  className=" ml-2" /></Button>
                           
                        ) : percentageVariation < 0 ? (
                            <Button variant='ghost' color='red'> <FaArrowDown  className=" ml-2" /></Button>
                        ) : null}
                        
                    </div>
                    </CardContent>
               </Card>         
       
    );
};

export default MonthlySales;
