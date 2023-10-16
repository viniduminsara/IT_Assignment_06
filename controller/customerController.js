import {CustomerModel} from "../model/customerModel.js";
import {customer_db} from "../db/db.js";
import {setCustomerIds} from "./orderController.js";
import {setCounts} from "./indexController.js";

//customer form
const customer_Id = $('#customerId');
const full_name = $('#fullname');
const address = $('#address');
const salary = $('#salary');
const customer_btn = $('#customer_btn button');
const  customer_search = $('#customer_search input');
const  customer_search_select = $('#customer_search select');

let lastCustomerId = 0;

customer_Id.val(generateCustomerId());

//add customer
customer_btn.eq(0).on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();
    let salaryVal = parseFloat(salary.val().trim());

    if (validate(customerId,'customer Id') && validate(fullName,'full name') &&
        validate(addressVal,'address') && validate(salaryVal,'salary')) {

        let customer = new CustomerModel(customerId, fullName, addressVal, salaryVal);

        if (getCustomerIndex(customerId) < 0) {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                if (result.isConfirmed) {
                    customer_db.push(customer);
                    loadCustomerTable();
                    customer_btn.eq(3).click();
                    customer_Id.val(generateCustomerId());
                    setCustomerIds();
                    setCounts();

                    Swal.fire('Customer Saved!', '', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Customer is already exists 😔',
            });
        }
    }
});

//update customer
customer_btn.eq(1).on('click', () => {
    let customerId = customer_Id.val().trim();
    let fullName = full_name.val().trim();
    let addressVal = address.val().trim();
    let salaryVal = parseFloat(salary.val().trim());

    if (validate(customerId,'customer Id') && validate(fullName,'full name') &&
        validate(addressVal,'address') && validate(salaryVal,'salary')) {

        let customer = new CustomerModel(customerId, fullName, addressVal, salaryVal);
        let index = getCustomerIndex(customerId);

        if (index >= 0) {
            Swal.fire({
                title: 'Do you want to update the customer?',
                showDenyButton: true,
                confirmButtonText: 'Update',
                denyButtonText: `Don't update`,
            }).then((result) => {
                if (result.isConfirmed) {
                    customer_db[index] = customer;
                    loadCustomerTable();
                    customer_btn.eq(3).click();
                    customer_Id.val(generateCustomerId());

                    Swal.fire('Customer Updated!', '', 'success');

                } else if (result.isDenied) {
                    Swal.fire('Changes are not updated!', '', 'info')
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Customer did not exists 😓',
            });
        }
    }
});

//delete customer
customer_btn.eq(2).on('click', () => {
    let customerId = customer_Id.val().trim();

    if (validate(customerId, 'customer Id')) {
        let index = getCustomerIndex(customerId);

        if (index >= 0) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    customer_db.splice(index, 1);
                    loadCustomerTable();
                    customer_btn.eq(3).click();
                    customer_Id.val(generateCustomerId());
                    setCustomerIds();
                    setCounts();

                    Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Customer did not exists 😓',
            });
        }
    }
});

//customer search
customer_search.on('input', function() {
    let option = customer_search_select.find(":selected").text();
    let searchTerm = customer_search.val().trim();
    let matchingCustomers = customer_db.filter(customer => customer[option] === searchTerm);

    if (matchingCustomers.length > 0) {
        $('tbody').eq(0).empty();
        matchingCustomers.forEach(customer => {
            $('tbody').eq(0).append(
                `<tr>
                    <th scope="row">${customer.customer_id}</th>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>`
            );
        });
    } else {
        loadCustomerTable();
    }
});

//load customer
$('tbody').eq(0).on('click', 'tr', function() {
    let customerId = $(this).find('th').eq(0).text();
    let index = getCustomerIndex(customerId);

    customer_Id.val(customer_db[index].customer_id);
    full_name.val(customer_db[index].name);
    address.val(customer_db[index].address);
    salary.val(customer_db[index].salary);
});

//load the customer table
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

const getCustomerIndex = function (customerId) {
    return customer_db.findIndex(customer => customer.customer_id === customerId);
}

function generateCustomerId(){
    let lastId = 'O-001'; // Default if array is empty

    if (customer_db.length > 0){
        let lastElement = customer_db[customer_db.length - 1].customer_id;
        let lastIdParts = lastElement.split('-');
        let lastNumber = parseInt(lastIdParts[1]);

        lastId = `O-${String(lastNumber + 1).padStart(3, '0')}`;
    }

    return lastId;
}

function validate(value, field_name){
    if (!value){
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }
    return true;
}