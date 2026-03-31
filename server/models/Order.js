import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    payment_type: {
        type: String,
        default: 'advance',
    },
    currency: {
        type: String,
        default: 'INR',
    },
    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created',
    },
    items: [
        {
            product_id: {
                type: String, // Supporting both numeric and string (MongoDB) IDs
                required: true,
            },
            name: String,
            quantity: Number,
            price: Number,
        }
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Order = mongoose.model('Order', orderSchema);
export default Order;
