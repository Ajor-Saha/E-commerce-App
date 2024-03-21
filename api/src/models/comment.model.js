import mongoose, { Schema } from 'mongoose';

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: 'Product',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);
