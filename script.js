let trueCount = 0;
let falseCount = 0;

document.getElementById('trueButton').addEventListener('click', function() {
    trueCount++;
    updateChart();
});

document.getElementById('falseButton').addEventListener('click', function() {
    falseCount++;
    updateChart();
});

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['True', 'False'],
        datasets: [{
            label: '# of Votes',
            data: [trueCount, falseCount],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart() {
    myChart.data.datasets[0].data = [trueCount, falseCount];
    myChart.update();
}
