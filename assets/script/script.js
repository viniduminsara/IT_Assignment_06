// Get the canvas element
const ctx = document.getElementById('lineChart').getContext('2d');

// Define data
const data = {
    labels: ['January', 'March', 'May', 'July', 'September','November'],
    datasets: [{
        label: 'Revenue',
        data: [50000, 75000, 88000, 65000, 121000,96000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: '#2CC56F',
        borderWidth: 3
    }]
};

// Define chart options
const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

// Create the line chart
const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
myChart.update();