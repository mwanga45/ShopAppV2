
import { LineChart } from '@mui/x-charts/LineChart';
import type { XAxis } from '@mui/x-charts/models';
import type { ChartPops } from '../../type.interface';
import {
  dateAxisFormatter,
  percentageFormatter,
  usUnemploymentRate,
} from './dataset/usUnemploymentRate';

const xAxis: XAxis<'time'>[] = [
  {
    dataKey: 'date',
    scaleType: 'time',
    valueFormatter: dateAxisFormatter,
  },
];
const yAxis = [
  {
    valueFormatter: percentageFormatter,
  },
];
const series = [
  {
    dataKey: 'rate',
    showMark: false,
    valueFormatter: percentageFormatter,
  },
];
export const GridDemo:React.FC<ChartPops>=({RevenueRateChange}) => {
  return (
    <LineChart
      dataset={RevenueRateChange && RevenueRateChange.length > 0 ? RevenueRateChange.map(i => ({x:new Date(i.date ?? new Date()), y: i.rate ?? 0})): usUnemploymentRate}
      xAxis={xAxis}
      yAxis={yAxis}
      series={series}
      height={300}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}