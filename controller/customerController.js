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