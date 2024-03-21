import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        default: 0,
        type: Number,
    },
    category: {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    color: [{
        type: String,
    }],
    size: [{
        type: String,
    }],

}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
