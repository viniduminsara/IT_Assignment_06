export class OrderDetailModel{
    constructor(order_id, item_id, qty) {
        this.order_id = order_id;
        this.item_id = item_id;
        this.qty = qty;
    }
}