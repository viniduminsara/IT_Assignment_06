import {CustomerModel} from '/model/customerModel.js';
import {customer_db} from '/db/db.js';

//customer form
const customer_Id = $('#customerId');
const full_name = $('#fullname');
const address = $('#address');
const salary = $('#salary');
const customer_btn = $('#customer_btn button');
const  customer_search = $('#customer_search input');
const  search_select = $('#customer_search select');

//add customer
customer_btn.eq(0).on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();
    let salaryVal = salary.val().trim();

    let customer = new CustomerModel(customerId, fullName, addressVal, salaryVal);

    customer_db.push(customer);
    loadCustomerTable();
    customer_btn.eq(3).click();
});

//update customer
customer_btn.eq(1).on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();
    let salaryVal = salary.val().trim();

    let customer = new CustomerModel(customerId, fullName, addressVal,salaryVal);

    let index = customer_db.findIndex(customer => customer.customer_id === customerId);
    customer_db[index] = customer;

    loadCustomerTable();
    customer_btn.eq(3).click();
});

//delete customer
customer_btn.eq(2).on('click', () => {
    let customerId = customer_Id.val().trim();

    let index = customer_db.findIndex(customer => customer.customer_id === customerId);
    customer_db.splice(index, 1);

    loadCustomerTable();
    customer_btn.eq(3).click();
});

//customer search
customer_search.on('input', function() {
    let option = search_select.find(":selected").text();
    let index = customer_db.findIndex(customer => customer[option] === customer_search.val().trim());

    if (index >= 0){
        $('tbody').eq(0).empty();
        $('tbody').eq(0).append(
            `<tr>
           <th scope="row">${customer_db[index].customer_id}</th>
           <td>${customer_db[index].name}</td>
           <td>${customer_db[index].address}</td>
           <td>${customer_db[index].salary}</td>
        </tr>`
        );
    }else{
        loadCustomerTable();
    }

})

$('tbody').eq(0).on('click', 'tr', function() {
    let customerId = $(this).find('th').eq(0).text();
    let index = customer_db.findIndex(customer => customer.customer_id === customerId);

    customer_Id.val(customer_db[index].customer_id);
    full_name.val(customer_db[index].name);
    address.val(customer_db[index].address);
    salary.val(customer_db[index].salary);
});

const loadCustomerTable = function () {

    $('tbody').eq(0).empty();
    customer_db.map((index) => {
        $('tbody').eq(0).append(
            `<tr>
            <th scope="row">${index.customer_id}</th>
            <td>${index.name}</td>
            <td>${index.address}</td>
            <td>${index.salary}</td>
         </tr>`
        );
    });

}