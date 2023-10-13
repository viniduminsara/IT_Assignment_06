import {OrderModel} from "../model/orderModel.js";
import {customer_db, item_db, order_db, order_details_db} from "../db/db.js";
import {OrderDetailModel} from "../model/orderDetailModel.js";
import {setCounts} from "./indexController.js";

const order_id = $('#order_Id');
const customer_id = $('#custId');
const date = $('#orderDate');
const item_Id = $('#item_Id');
const order_qty = $('#order_quantity');

const customer_name = $('#custName');
const qty_on_hand = $('#qtyOnHand');
const description = $('#desc');
const unit_price = $('#unit_price');
const net_total = $('.net_total span:nth-child(2)');
const sub_total = $('.sub_total span:nth-child(2)');
const discount = $('#discount');
const cash = $('#cash');
const balance = $('#balance');

const cart_btn = $('.cart_btn');
const order_btn = $('.order_btn');

let cart = [];

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

//set date
const formattedDate = new Date().toISOString().substr(0, 10);
date.val(formattedDate);

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

//add to cart
cart_btn.on('click', () => {
    let itemId = item_Id.val();
    let index = item_db.findIndex(item => item.item_code === itemId);
    let unitPrice = item_db[index].unit_price;
    let orderQTY = parseInt(order_qty.val());
    let total = unitPrice * orderQTY;

    if (item_db[index].qty > orderQTY) {
        let cartItemIndex = cart.findIndex(cartItem => cartItem.itemId === itemId);
        if (cartItemIndex < 0) {
            let cart_item = {
                itemId: itemId,
                unitPrice: unitPrice,
                qty: orderQTY,
                total: total
            }
            cart.push(cart_item);
            loadCart();
            setTotalValues()
            clearItemSection();
        } else {
            cart[cartItemIndex].qty += orderQTY;
            cart[cartItemIndex].total = cart[cartItemIndex].qty * cart[cartItemIndex].unitPrice;
            loadCart();
            setTotalValues()
            clearItemSection();
        }
    }else{
        alert('not enough quantity available 😔');
    }
});

//place order
order_btn.on('click', () => {
    let orderId = order_id.val();
    let order_date = date.val();
    let customerId = customer_id.val();

    //save order
    let order = new OrderModel(orderId, order_date, customerId);
    order_db.push(order);

    //save order details
    cart.forEach((cart_item) => {
        let order_detail = new OrderDetailModel(orderId, cart_item.itemId, cart_item.qty, cart_item.unitPrice);
        order_details_db.push(order_detail);
    });

    order_id.val(generateOrderId());
    cart.splice(0, cart.length);
    loadCart();
    clearItemSection();
    customer_id.val('select the customer');
    customer_name.val('');
    setCounts();

    alert('order placed successfully 🥳');
});

//set cart remove button
$('tbody').on('click', '.cart_remove', function() {
    const itemId = $(this).data('id');
    const index = cart.findIndex(cartItem => cartItem.itemId === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
        loadCart();
        setTotalValues();
    }
});

//set sub total value
discount.on('input', () => {
    let discountValue = parseFloat(discount.val()) || 0;
    if (discountValue < 0 || discountValue > 100) {
        discountValue = Math.min(100, Math.max(0, discountValue));
        discount.val(discountValue);
    }

    let total_value = calculateTotal();
    let discountAmount = (total_value * discountValue) / 100;
    sub_total.text(`${total_value - discountAmount}/=`);
});

//set balance
cash.on('input', () => {
    let subTotal = parseFloat(sub_total.text());
    let cashAmount = parseFloat(cash.val());
    balance.val(cashAmount - subTotal);
});

//search order
order_id.on('input', () => {
    let orderId = order_id.val();
    let index = order_db.findIndex(order => order.orderId === orderId);
    if (index >= 0){
        customer_id.val(order_db[index].customerId);
        date.val(order_db[index].date);

        cart.splice(0, cart.length);
        for(let i=0; i<order_details_db.length; i++){
            if (orderId === order_details_db[i].order_id){
                let total = order_details_db[i].unit_price * order_details_db[i].qty;

                let cart_item = {
                    itemId: order_details_db[i].item_id,
                    unitPrice: order_details_db[i].unit_price,
                    qty: order_details_db[i].qty,
                    total: total
                }
                cart.push(cart_item);
            }
        }

        loadCart();
    }else if(order_id.val() === ''){
        order_id.val(generateOrderId());
        cart.splice(0, cart.length);
        loadCart();
        clearItemSection();
        customer_id.val('select the customer');
        customer_name.val('');
    }
});

function loadCart() {
    $('tbody').eq(2).empty();
    cart.map((item) => {
        $('tbody').eq(2).append(
            `<tr>
                <th scope="row">${item.itemId}</th>
                <td>${item.unitPrice}</td>
                <td>${item.qty}</td>
                <td>${item.total}</td>
                <td><button class="cart_remove" data-id="${item.itemId}">Remove</button></td>
            </tr>`
        );
    });
}

function calculateTotal(){
    let netTotal = 0;
    cart.map((cart_item) => {
        netTotal += cart_item.total;
    });
    return netTotal;
}

function setTotalValues(){
    let netTotal = calculateTotal();
    net_total.text(`${netTotal}/=`);

    let discount_percentage = discount.val() || 0;
    let discountAmount = (netTotal * discount_percentage) / 100;
    sub_total.text(`${netTotal - discountAmount}/=`);
}

function clearItemSection() {
    item_Id.val('select the item');
    description.val('');
    qty_on_hand.val('');
    unit_price.val('');
    order_qty.val('');
}

function generateOrderId() {
    if (order_db.length > 0){
        return `O-00${order_db.length + 1}`;
    }else{
        return 'O-001';
    }
}

