import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

export default function _Chart({labels, data}) {
    const datasets = data.map(set => {
        return {
            label: '-',
            data: set,

            fill: true,
            backgroundColor: "#eab308",
            tension: .15
        }
    })

    return (
        <Bar data={{labels, datasets}} 
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
            },
            maintainAspectRatio: false
        }} />
    )
}