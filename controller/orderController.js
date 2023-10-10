import {OrderModel} from "../model/orderModel.js";
import {customer_db, item_db, order_db} from "../db/db.js";

const order_id = $('#order_Id');
const customer_id = $('#custId');
const date = $('#orderDate');
const item_Id = $('#item_Id');
const order_qty = $('#order_quantity');

const customer_name = $('#custName');
const qty_on_hand = $('#qtyOnHand');
const description = $('#desc');
const unit_price = $('#unit_price');

const cart_btn = $('.cart_btn');
const order_btn = $('.order_btn');

//generate orderId
order_id.val(generateOrderId());

//set customer Ids
export function setCustomerIds() {
    customer_id.empty();
    customer_id.append('<option selected>select the customer</option>');

    let customer_ids = [];
    customer_db.map((value) => {
        customer_ids.push(value.customer_id);
    });

    customer_ids.map((index) => {
        customer_id.append(
            `<option>${index}</option>`
        )
    });
}

//set customer details
customer_id.on('input', () => {
    if (customer_id.val() !== 'select the customer'){
        let index = customer_db.findIndex(customer => customer.customer_id === customer_id.val());
        customer_name.val(customer_db[index].name);
    }else{
        customer_name.val('');
    }
});

//set item Ids
export function setItemIds() {
    item_Id.empty();
    item_Id.append('<option selected>select the item</option>');

    let item_ids = [];
    item_db.map((value) => {
        item_ids.push(value.item_code);
    });

    item_ids.map((index) => {
        item_Id.append(
            `<option>${index}</option>`
        )
    });
}

//set item details
item_Id.on('input', () => {
    if (item_Id.val() !== 'select the item'){
        let index = item_db.findIndex(item => item.item_code === item_Id.val());
        description.val(item_db[index].description);
        unit_price.val(item_db[index].unit_price);
        qty_on_hand.val(item_db[index].qty);
    }else{
        description.val('');
        unit_price.val('');
        qty_on_hand.val('');
    }
});

function generateOrderId() {
    if (order_db.length > 0){
        return `O-00${order_db.length + 1}`;
    }else{
        return 'O-001';
    }
}

