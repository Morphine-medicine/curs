import { Router } from 'express'
import Products from '../models/Products.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { ROLE } from '../config.js'
const router = Router()

//GET all
router.get('/api/products', async (req, res) => {
    try {
        const products = await Products.find({})

        res.status(200).json(products)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

//GET 1
router.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Products.findById(req.params.id)
        res.status(200).json(product)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

//POST
router.post('/api/products', authMiddleware([ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        const product = new Products({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        })

        await product.save()
        await res.status(201).json(product)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

// PUT
router.put('/api/products/:id', authMiddleware([ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await res.status(200).json(product)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

//DELETE
router.delete('/api/products/:id', authMiddleware([ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id)
        await res.status(200).json({ message: 'Successfully deleted' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})


export default router
