import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import usersRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import imagesRoutes from './routes/images.js'
import orderRoutes from './routes/order.js'


const credentials = {
    user: 'user',
    password: 'userpassword'
}

const app = express()
const port = process.env.PORT || 5000
const dbUrl = `mongodb+srv://${credentials.user}:${credentials.password}@cluster0.xhhci.mongodb.net/testDatabase`
const __dirname = path.resolve()

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const corsOptions = {
    origin: true,
    credentials: true
}
app.use(cors(corsOptions))

app.use(usersRoutes)
app.use(authRoutes)
app.use(productRoutes)
app.use(imagesRoutes)
app.use(orderRoutes)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
    })
}

async function start() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
        })
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}


start()

