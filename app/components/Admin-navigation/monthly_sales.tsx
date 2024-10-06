"use client"
import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
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
        <div className="max-w-[500px] xl:max-w-full m-5 p-5 rounded-md border-2">
            <div>
                <Text size="5">Month to Date</Text><br/>
                <Text className="text-3xl">${currentSales?.totalSales || 0}</Text>
                <Flex my="4">
                    <Text size="4">{new Date(0, selectedMonth - 1).toLocaleString('en-US', { month: 'long' })} </Text>
                    &nbsp;<Text size="4" className='mr-4'>{selectedYear}</Text>
                    <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button  variant="surface" size="2">
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
                        <p className="text-2xl">{percentageVariation.toFixed(2)}%</p>
                        {percentageVariation > 0 ? (
                          
                           <Button variant='ghost' color='jade'> <FaArrowUp  className=" ml-2" /></Button>
                           
                        ) : percentageVariation < 0 ? (
                            <Button variant='ghost' color='red'> <FaArrowDown  className=" ml-2" /></Button>
                        ) : null}
                    </div>
            </div>
            
        </div>
    );
};

export default MonthlySales;
