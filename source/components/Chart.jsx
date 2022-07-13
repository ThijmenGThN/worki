import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

export default function _Chart({labels, data}) {
    const datasets = data.map(set => {
        return {
            label: '-',
            data: set,

            fill: true,
            backgroundColor: "rgba(234,179,8,.2)",
            borderColor: "#eab308",
            tension: .15
        }
    })

    return (
        <div>
            <Line data={{labels, datasets}} 
            options={{
                plugins: {
                    legend: { display: false }
                },
                scales: { 
                    y: { display: false },
                    x: { display: false }
                },
                elements: {
                    point: { radius: 0 }
                }
            }} />
        </div>
    )
}