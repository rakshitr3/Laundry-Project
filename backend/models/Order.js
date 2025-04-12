const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    items: [
        {
            type: {
                type: String
            },
            washType: [String],
            quantity: Number,
            price: Number,
        }
    ],
    store: String,
    storeAddress: String,
    phone: String,
    address: String,
    pickupCharges: Number,
    total: Number,
}, { timestamps: true });


module.exports = mongoose.model("Order", OrderSchema);
