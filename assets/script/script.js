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

//customer form

const customer_Id = $('#customerId');
const full_name = $('#fullname');
const address = $('#address');

const customer_submit = $('#customer_submit');
const customer_update = $('#customer_update');
const customer_delete = $('#customer_delete');
const customerReset = $("button[type = 'reset']").eq(0);

customer_submit.on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();

    $('tbody').eq(0).append(
        `<tr>
            <th scope="row">${customerId}</th>
            <td>${fullName}</td>
            <td>${addressVal}</td>
         </tr>`
    );
    customerReset.click();
});

customer_update.on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();

    $('tbody').eq(0).find('tr').each(function() {

        let cust_Id = $(this).find('th').text();

        if (cust_Id === customerId) {
            $(this).find('td:nth-child(2)').text(fullName);
            $(this).find('td:nth-child(3)').text(addressVal);
            customerReset.click();
        }
    });
});

customer_delete.on('click', () => {
    let customerId = customer_Id.val().trim();

    $('tbody').eq(0).find('tr').each(function() {

        let cust_Id = $(this).find('th').text();

        if (cust_Id === customerId) {
            $(this).remove();
            customerReset.click();
        }
    });
});