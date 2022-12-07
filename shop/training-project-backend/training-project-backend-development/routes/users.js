import { Router } from 'express'
import Users from '../models/Users.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { ROLE } from '../config.js'
const router = Router()

router.get('/', authMiddleware([ROLE.USER, ROLE.ADMIN, ROLE.MODER]), (req, res) => {
    res.send('<h1>First app using express</h1>')
})

//GET all
router.get('/api/users', authMiddleware([ROLE.USER, ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        const users = await Users.find({})

        res.status(200).json(users)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

//GET 1
router.get('/api/users/:id', authMiddleware([ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

//POST
router.post('/api/users', authMiddleware([ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        const users = new Users({
            name: req.body.name
        })

        await users.save()
        await res.status(201).json(users)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }

})

// PUT
router.put('/api/users/:id', authMiddleware([ROLE.ADMIN, ROLE.MODER]), async (req, res) => {
    try {
        await Users.findByIdAndUpdate(req.params.id, req.body)
        await res.status(200).json({ message: 'Successfully updated' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

//DELETE
router.delete('/api/users/:id', authMiddleware([ROLE.ADMIN]), async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        await res.status(200).json({ message: 'Successfully deleted' })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})


export default router
