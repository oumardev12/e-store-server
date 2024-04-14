import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        maxlength: [50, "max length 50 characters"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    purchases: [
        {
            data: {
                email: {
                    type: String,
                },
                firstName: {
                    type: String,
                },
                lastName: {
                    type: String,
                },
                address: {
                    type: String,
                },
                shippingCountry: {
                    type: String,
                },
                city: {
                    type: String,
                },
                zipCode: {
                    type: String,
                },
            },
            products: [
                {
                    product_id: {
                        type: String,
                        required: [true, "product id is required"],
                    },
                    quantity: {
                        type: String,
                        required: [true, "product quantity is required"],
                    },
                },
            ],
            purchase_at: {
                type: Date,
                required: [true, "timestamp is required"],
            },
        },
    ],
});
export default mongoose.model("users", userSchema);
