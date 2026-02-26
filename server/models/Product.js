import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    badge: {
        type: String,
        enum: ['sale', 'new', 'hot', ''],
    },
    description: {
        type: String,
        required: true,
    },
    specs: {
        type: Map,
        of: String
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Product = mongoose.model('Product', productSchema);
export default Product;
