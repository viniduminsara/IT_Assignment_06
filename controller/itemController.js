import {ItemModel} from "../model/itemModel.js";
import {item_db} from "../db/db.js";
import {setItemIds} from "./orderController.js";

//item form
const item_Code = $('#itemCode');
const description = $('#description');
const unit_price = $('#unitPrice');
const qty = $('#qty');
const item_btns = $('#item_btn button');
const item_search = $('#item_search input');
const item_search_select = $('#item_search select');

//add item
item_btns.eq(0).on('click', () => {
   let itemCode = item_Code.val().trim();
   let desc = description.val().trim();
   let price = parseFloat(unit_price.val().trim());
   let qty_val = parseInt(qty.val());

   let item = new ItemModel(itemCode, desc, price, qty_val);

   if (getItemIndex(itemCode) < 0){
       if (confirm('Are you want to add a item ?')){
           item_db.push(item);
           loadItemTable();
           item_btns.eq(3).click();
           setItemIds();
       }
   }else{
       alert('Item is already exists 😊');
   }
});

//update item
item_btns.eq(1).on('click', () => {
    let itemCode = item_Code.val().trim();
    let desc = description.val().trim();
    let price = parseFloat(unit_price.val().trim());
    let qty_val = parseInt(qty.val());

    let item = new ItemModel(itemCode, desc, price, qty_val);

    let index = getItemIndex(itemCode);
    if (index >= 0){
        if (confirm(`Are you sure to update ${itemCode} ?`)){
            item_db[index] = item;
            loadItemTable();
            item_btns.eq(3).click();
            setItemIds();
        }
    }else{
        alert('Item did not exists 😓');
    }

});

//delete item
item_btns.eq(2).on('click', () => {
    let itemCode = item_Code.val().trim();

    let index = getItemIndex(itemCode);
    if (index >= 0){
        if (confirm(`Are you sure to delete ${itemCode} ?`)){
            item_db.splice(index, 1);
            loadItemTable();
            item_btns.eq(3).click();
            setItemIds();
        }
    }else{
        alert('Item did not exists 😓');
    }
});

//item search
item_search.on('input', function (){
    let option = item_search_select.find(':selected').text();
    let searchTerm = item_search.val().trim();
    let matchingItems = item_db.filter(item => item[option] === searchTerm);

    if (matchingItems.length > 0){
        $('tbody').eq(1).empty();
        matchingItems.forEach(item => {
            $('tbody').eq(1).append(
                `<tr>
                    <th scope="row">${item.item_code}</th>
                    <td>${item.description}</td>
                    <td>${item.unit_price}</td>
                    <td>${item.qty}</td>
                 </tr>`
            );
        });
    }else{
        loadItemTable();
    }
});

//load item
$('tbody').eq(1).on('click', 'tr', function() {
    let itemCode = $(this).find('th').eq(0).text();
    let index = getItemIndex(itemCode);

    item_Code.val(item_db[index].item_code);
    description.val(item_db[index].description);
    unit_price.val(item_db[index].unit_price);
    qty.val(item_db[index].qty);
});

//load the item table
const loadItemTable = function () {
    $('tbody').eq(1).empty();
    item_db.map((index) => {
        $('tbody').eq(1).append(
            `<tr>
            <th scope="row">${index.item_code}</th>
            <td>${index.description}</td>
            <td>${index.unit_price}</td>
            <td>${index.qty}</td>
         </tr>`
        );
    });
}

loadItemTable();

const getItemIndex = function (itemCode){
    return item_db.findIndex(item => item.item_code === itemCode);
}

