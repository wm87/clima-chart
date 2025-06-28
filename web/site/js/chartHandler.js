// chartHandler.js
const ctx = document.getElementById('canvas').getContext('2d');
let chart = null;

function renderChart(allText) {
    const [headerLine, ...lines] = allText.trim().split(/\r?\n/);
    const headers = headerLine.split(';');

    const years = [], degrees = [], rainfall = [];
    lines.forEach(line => {
        const data = line.split(';');
        if (data.length === headers.length) {
            years.push(data[1]);
            degrees.push(data[2]);
            rainfall.push(data[3]);
        }
    });

    const config = {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    type: 'line',
                    label: 'Temperatur',
                    borderColor: 'red',
                    data: degrees,
                    yAxisID: 'y'
                },
                {
                    type: 'bar',
                    label: 'Niederschlag',
                    backgroundColor: 'blue',
                    data: rainfall,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { position: 'left' },
                y1: { position: 'right', grid: { drawOnChartArea: false } }
            }
        }
    };

    if (chart) chart.destroy();
    chart = new Chart(ctx, config);
}
