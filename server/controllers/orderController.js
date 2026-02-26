import Razorpay from 'razorpay';
import Order from '../models/Order.js';
import crypto from 'crypto';

// @desc    Create Razorpay order
// @route   POST /api/orders
export const createRazorpayOrder = async (req, res) => {
    const { amount, items } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `order_${Date.now()}`,
    };
    try {
        const razorpayOrder = await razorpay.orders.create(options);
        if (!razorpayOrder) {
            return res.status(500).json({ message: "Failed to create Razorpay order" });
        }

        // Save order to DB
        const order = await Order.create({
            user_id: req.user._id,
            razorpay_order_id: razorpayOrder.id,
            amount: amount,
            currency: "INR",
            status: "created",
            items: items || [],
        });

        res.status(201).json({
            order_id: razorpayOrder.id,
            db_order_id: order._id,
            key_id: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error("Razorpay error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify Razorpay payment
// @route   POST /api/orders/verify
export const verifyRazorpayPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, db_order_id } = req.body;

    const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid payment signature" });
    }

    try {
        const order = await Order.findById(db_order_id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.razorpay_payment_id = razorpay_payment_id;
        order.status = "paid";
        order.updated_at = Date.now();
        await order.save();

        res.json({ success: true, payment_id: razorpay_payment_id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
