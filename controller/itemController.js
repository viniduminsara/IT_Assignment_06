import {ItemModel} from "../model/itemModel.js";
import {item_db} from "../db/db.js";

//item form
const item_code = $('#itemCode');
const description = $('#description');
const unit_price = $('#unitPrice');
const qty = $('#qty');
const item_btns = $('#item_btn button');
const item_search = $('#item_search input');
const item_search_select = $('#item_search select');

//add item
item_btns.eq(0).on('click', () => {
   let itemCode = item_code.val().trim();
   let desc = description.val().trim();
   let price = unit_price.val().trim();
   let qty_val = qty.val();

   let item = new ItemModel(itemCode, desc, price, qty_val);

   if (confirm('Are you want to add a item ?')){
       item_db.push(item);
       loadItemTable();
       item_btns.eq(3).click();
   }
});

//update item
item_btns.eq(1).on('click', () => {
    let itemCode = item_code.val().trim();
    let desc = description.val().trim();
    let price = unit_price.val().trim();
    let qty_val = qty.val();

    let item = new ItemModel(itemCode, desc, price, qty_val);
    let index = item_db.findIndex(db_item => db_item.item_code === itemCode);

    if (index >= 0){
        if (confirm(`Are you sure to update ${itemCode} ?`)){
            item_db[index] = item;
            loadItemTable();
            item_btns.eq(3).click();
        }
    }else{
        alert('Not found the item');
    }

});

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

