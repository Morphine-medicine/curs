import { Router } from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { ROLE } from '../config.js'
import Orders from '../models/Orders.js'
import Products from '../models/Products.js'
import mongoose from 'mongoose'
import Auth from '../models/Auth.js'

const router = Router()

router.post('/api/orders/placeOrder', async (req, res) => {
    try {
        const order = new Orders({
            userId: req.body.userId,
            email: req.body.email,
            phone: req.body.phone,
            cart: req.body.cart,
            totalPrice: req.body.totalPrice
        })

        await order.save()
        await res.status(201).json(order)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

router.get('/api/orders', async (req, res) => {
    try {
        const orders = await Orders.find({})

        res.status(200).json(orders)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

router.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id).populate({
            path: 'cart',
            populate: {
                path: 'items',
                populate: {
                    path: '_id',
                    model: Products
                }
                
            }

        })
        res.status(200).json(order)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

router.put('/api/orders/changeStatus/:id', authMiddleware([ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        const order = await Orders.findByIdAndUpdate(req.params.id, req.body, {new: true} )
        res.status(200).json({ status: order.status, _id: order._id })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})


router.get('/api/orders/user/:id', async (req, res) => {
    try {
        const userId = mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null

        if(!userId || !await Auth.findById(userId)) {
            res.status(400).json({ message: 'Non existent user' })
        }
       
        const orders = await Orders.find({userId})
        res.status(200).json(orders)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

export default router
