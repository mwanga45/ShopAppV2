import type React from "react"
import { 
    ResponsiveContainer,
    Tooltip,
    Legend,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart
    
} from "recharts"
interface ChartPops {
    Pname:string
}
export const Complinechart:React.FC<ChartPops> = ({Pname}) =>{
    const Thisweek = [
        {day:"Monday", Sales:23450},
        {day:"Tuesday", Sales:20400},
        {day:"Wensday", Sales:25400},
        {day:"Thursday", Sales:26700},
        {day:"Friday", Sales:33400},
    ]
    const LastWeek = [
        {day:"Monday", Sales:20400},
        {day:"Tuesday", Sales:23400},
        {day:"Wensday", Sales:22400},
        {day:"Thursday", Sales:19400},
        {day:"Friday", Sales:25500},
        {day:"Saturday", Sales:44400},
        {day:"Sunday", Sales:63510}
       
    ]

    return (
        <div style={{display:"flex",flexDirection:"column"}}>
            <h1 style={{color:"black",fontSize:"20px",fontWeight:"bold"}}>{Pname}</h1>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={Thisweek} // Use Thisweek data for the chart
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Sales" stroke="#8884d8" name="This Week" strokeWidth={3}/>
                <Line type="monotone" data={LastWeek} dataKey="Sales" stroke="#025e26ff" name="Last Week"  strokeWidth={3}/>
            </LineChart>
        </ResponsiveContainer>
        </div>
    );
}
export const  BarCompChart = ()=>{
        const Thisweek = [
        {day:"Monday", Sales:20450},
        {day:"Tuesday", Sales:10400},
        {day:"Wensday", Sales:20400},
        {day:"Thursday", Sales:26700},
        {day:"Friday", Sales:39400},
    ]
    const LastWeek = [
        {day:"Monday", SalesProfit:10400},
        {day:"Tuesday",SalesProfit:13400},
        {day:"Wensday",SalesProfit:32400},
        {day:"Thursday",SalesProfit:10400},
        {day:"Friday", SalesProfit:20000},
        {day:"Saturday",SalesProfites:14400},
        {day:"Sunday", SalesProfit:13510}
       
    ]

} 