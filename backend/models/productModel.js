import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },  
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
        },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        type: [String],
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subCategory: {
        type: String,
        required: true,
        trim: true
    },
    sizes : {
        type: [String],
        required: true
    },
    bestseller: {
        type: Boolean,
        default: false
    },
    date : {
        type: Date,
        default: Date.now
    }
})
const ProductModel = mongoose.model.product || mongoose.model('Product', productSchema);
export default ProductModel;