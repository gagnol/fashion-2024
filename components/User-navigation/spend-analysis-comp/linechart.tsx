"use client";
import { FC } from "react";
import {
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";


const Linechat = ({ data }: { data: { month: string, data: any[] } }) => {

	const tickFormater = (number: number) => {
		if (number > 1000000000) {
			return (number / 1000000000).toString() + "B";
		} else if (number > 1000000) {
			return (number / 1000000).toString() + "M";
		} else if (number > 1000) {
			return (number / 1000).toString() + "K";
		} else {
			return number.toString();
		}
	};

	return (
		<div className="h-[350px] w-full bg-white rounded-[12px]">
			<h2 className="text-[#8A8A8A] text-[18px] font-[400] p-5 pt-7 pl-8">
				Daily Sales <strong> {data.month}</strong>
			</h2>
			<ResponsiveContainer width={"100%"} height={"100%"}>
				<LineChart
					data={data.data}
					margin={{ top: 5, bottom: 30, right: 40, left: 15 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						tick={{ fill: "#BFBFBF", fontSize: "14px" }}
						stroke="#BFBFBF"
					/>
					<YAxis
						stroke="#BFBFBF"
					/>
					<Tooltip />
					<Line
						dataKey="sales"
						stroke="#6649B6"
						strokeWidth={1.5}
						type={"linear"}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Linechat;
