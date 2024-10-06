"use client"
import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { getSalesPerYear } from '@/actions/dashborad';

const YearSales = ({ salesData }: any) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [currentYearSales, setCurrentYearSales] = useState<number>(0);
    const [previousYearSales, setPreviousYearSales] = useState<number>(0);
    const [percentageVariation, setPercentageVariation] = useState<number>(0);

    const handleYearChange = (year: number) => {
        setSelectedYear(year);
    };

    useEffect(() => {
        // Calculate percentage variation whenever the sales data changes
        if (currentYearSales && previousYearSales) {
            const variation = ((currentYearSales - previousYearSales) / previousYearSales) * 100;
            setPercentageVariation(variation);
        }
    }, [currentYearSales, previousYearSales]);

    // Example useEffect to fetch sales data
    useEffect(() => {
        async function fetchSalesData() {
            const data =await getSalesPerYear();
            setCurrentYearSales(data.currentYearSales);
            setPreviousYearSales(data.previousYearSales);
        }
        fetchSalesData();
    }, [selectedYear]);

    return (
        <Card className="w-full border-0 shadow-xl py-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#8A8A8A]">
                    Year to Date Sales
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-[700] text-[#6649B6]">
                   ${currentYearSales.toFixed(2)}
                </div>
                <Flex my="4">
                    <Text size="2" className='p-[2px]'>
                        {selectedYear}
                    </Text>
                    &nbsp;
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="surface" size="1">
                                Year
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content size="2">
                            {[currentYear, currentYear - 1].map((year, index) => (
                                <DropdownMenu.Item
                                    key={index}
                                    onSelect={() => handleYearChange(year)}
                                >
                                    {year}
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
                <div className="flex items-center">
                    <Text size="1">Prior Year Comparison</Text>
                    <p className="text-2xl">{percentageVariation.toFixed(2)}%</p>
                    {percentageVariation > 0 ? (
                        <Button variant='ghost' color='jade'>
                            <FaArrowUp className="ml-2" />
                        </Button>
                    ) : percentageVariation < 0 ? (
                        <Button variant='ghost' color='red'>
                            <FaArrowDown className="ml-2" />
                        </Button>
                    ) : null}
                </div>
            </CardContent>
        </Card>
    );
};

export default YearSales;
