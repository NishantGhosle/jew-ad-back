import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true, validate: [arrayLimit, 'Exceeds image limit of 10'] },
}, { timestamps: true });

function arrayLimit(val) {
    return val.length <= 10;
}

export default mongoose.model('Product', productSchema);

