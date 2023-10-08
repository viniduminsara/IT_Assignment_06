// navigation
$('#customer').css('display','none');
$('#item').css('display','none');
$('#order').css('display','none');
$('#place_order').css('display','none');

$('#home_nav').on('click', () => {
    $('#home').css('display', 'block');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#place_order').css('display', 'none');

    $('#home_nav').addClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').removeClass('active-page');
});

$('#customer_nav, #customer_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'block');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#place_order').css('display', 'none');

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').addClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').removeClass('active-page');
});

$('#item_nav, #item_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'block');
    $('#order').css('display', 'none');
    $('#place_order').css('display', 'none');

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').addClass('active-page');
    $('#order_nav').removeClass('active-page');
});

$('#order_nav, #order_link').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'block');
    $('#place_order').css('display', 'none');

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#order_nav').addClass('active-page');
});

$('#place_order_btn').on('click', () => {
    $('#home').css('display', 'none');
    $('#customer').css('display', 'none');
    $('#item').css('display', 'none');
    $('#order').css('display', 'none');
    $('#place_order').css('display', 'block');
});



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