import { LineChart } from '@mui/x-charts/LineChart'
import { formatDate } from '../utils'

function DurationChart({ dates, durations }) {
  return (
    <LineChart
      xAxis={[{
        scaleType: 'point',
        data: dates,
        valueFormatter: (value) => formatDate(value),
      }]}
      series={[{ data: durations, label: 'Duration (min)' }]}
      height={300}
    />
  )
}

export default DurationChart