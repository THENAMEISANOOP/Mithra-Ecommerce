import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cartData : {
        type: Object,
        default: {}
    },
   
},{minimize : false, timestamps: true});

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);
export default UserModel;