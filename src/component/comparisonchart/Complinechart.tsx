import type React from "react"
import { 
    ResponsiveContainer,
    Tooltip,
    Legend,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    BarChart, 
    Bar 
    
} from "recharts"
import type { ChartPops } from "../../type.interface"
interface GraphTitle {
    title?:string
}
export const Complinechart:React.FC<ChartPops & GraphTitle>  = ({title, Thisweek, LastWeek}) =>{
    // const Thisweek = [
    //     {day:"Monday", Sales:23450},
    //     {day:"Tuesday", Sales:20400},
    //     {day:"Wensday", Sales:25400},
    //     {day:"Thursday", Sales:26700},
    //     {day:"Friday", Sales:33400},
    // ]
    // const LastWeek = [
    //     {day:"Monday", Sales:20400},
    //     {day:"Tuesday", Sales:23400},
    //     {day:"Wensday", Sales:22400},
    //     {day:"Thursday", Sales:19400},
    //     {day:"Friday", Sales:25500},
    //     {day:"Saturday", Sales:44400},
    //     {day:"Sunday", Sales:63510}    
    // ]
        const combinedData = Thisweek && Thisweek.map((weekData) => {
        const lastWeekMatch =LastWeek && LastWeek.find((lastWeekData) => lastWeekData.day === weekData.day);
        return {
            ...weekData,
            LastWeekSalesProfit: lastWeekMatch ? lastWeekMatch.Revenue : 0, // Add LastWeekSalesProfit or default to 0
        };
    });
    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <h1 style={{color:"black",fontSize:"20px",fontWeight:"bold"}}>{title}</h1>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={combinedData} // Use Thisweek data for the chart
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                 <YAxis dataKey={'Revenue'} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Revenue" stroke="#8884d8" name="This Week" strokeWidth={3}/>
                <Line type="monotone" data={LastWeek} dataKey="Revenue" stroke="#025e26ff" name="Last Week"  strokeWidth={3}/>
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
}
export const  BarCompChart:React.FC<ChartPops & GraphTitle > = ({title,LastWeek, Thisweek})=>{


    // Combine data for BarChart
    const combinedData = Thisweek && Thisweek.map((weekData) => {
        const lastWeekMatch =LastWeek && LastWeek.find((lastWeekData) => lastWeekData.day === weekData.day);
        return {
            ...weekData,
            LastWeekSalesProfit: lastWeekMatch ? lastWeekMatch.Revenue : 0, // Add LastWeekSalesProfit or default to 0
        };
    });

    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <h1 style={{color:"black",fontSize:"20px",fontWeight:"bold"}}>{title}</h1>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={combinedData} 
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis dataKey={'Revenue'} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Revenue" fill="#2cc900ff" name="This Week Sales" />
                    {/* Removed data={LastWeek} and changed dataKey to LastWeekSalesProfit */}
                    <Bar dataKey="LastWeekSalesProfit" fill="#2218d9ff" name="Last Week Profit" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
} 