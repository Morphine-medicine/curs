import mongoose from 'mongoose'
import Products from './Products.js'
import Auth from './Auth.js'

const schema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: Auth, default: null},
    email: { type: String, required: true },
    phone: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['CREATED', 'SHIPPING', 'ARRIVED', 'CONFIRMED', 'DECLINED' ], 
        default: 'CREATED' 
    },
    cart: {
        items: [
            {
                item: { type: mongoose.Schema.Types.ObjectId, ref: Products } ,
                quantity: { type: Number, default: 0, required: true }
            }
        ],
        totalPrice: { type: Number, default: 0, required: true }
    }
})

export default mongoose.model('Orders', schema)