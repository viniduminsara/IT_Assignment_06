import {CustomerModel} from '/model/customerModel.js';
import {customer_db} from '/db/db.js';

//customer form
const customer_Id = $('#customerId');
const full_name = $('#fullname');
const address = $('#address');
const customer_btn = $('#customer_btn button');

customer_btn.eq(0).on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();

    let customer = new CustomerModel(customerId, fullName, addressVal);

    customer_db.push(customer);
    loadCustomerTable();
    customer_btn.eq(3).click();
});

customer_btn.eq(1).on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();

    let customer = new CustomerModel(customerId, fullName, addressVal);

    let index = customer_db.findIndex(customer => customer.customer_id === customerId);
    customer_db[index] = customer;

    loadCustomerTable();
    customer_btn.eq(3).click();
});

customer_btn.eq(2).on('click', () => {
    let customerId = customer_Id.val().trim();

    let index = customer_db.findIndex(customer => customer.customer_id === customerId);
    customer_db.splice(index, 1);

    loadCustomerTable();
    customer_btn.eq(3).click();
});

const loadCustomerTable = function () {

    $('tbody').eq(0).empty();
    customer_db.map((index) => {
        $('tbody').eq(0).append(
            `<tr>
            <th scope="row">${index.customer_id}</th>
            <td>${index.name}</td>
            <td>${index.address}</td>
         </tr>`
        );
    });

}