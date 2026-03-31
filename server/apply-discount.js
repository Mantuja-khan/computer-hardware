import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const applyDiscount = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for discount update...');

        const products = await Product.find({});
        console.log(`Found ${products.length} products to update.`);

        for (const product of products) {
            // Mark as refurbished if laptop
            if (product.category === 'Laptops' && !product.name.includes('Refurbished')) {
                product.name = `Refurbished ${product.name}`;
                if (!product.description.includes('Refurbished')) {
                    product.description = `[Premium Refurbished] ${product.description}`;
                }
            }
            
            // Only apply discount if oldPrice is not set (i.e., not already discounted)
            // If oldPrice is already there, it means we already discounted it.
            if (!product.oldPrice) {
                product.oldPrice = product.price;
                product.price = Math.round(product.price * 0.3); // 70% off
            }
            
            product.badge = 'sale';
            await product.save();
        }

        console.log('Successfully applied 70% discount to all products!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error applying discount:', err);
        process.exit(1);
    }
};

applyDiscount();
