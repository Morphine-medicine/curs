import { Router } from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import Products from '../models/Products.js'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()

const bucketName = process.env.S3_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
})

const upload =
    multer({
        storage: multerS3({
            s3,
            bucket: bucketName,
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, Date.now().toString());
            },
        }),
    })

const router = Router()


function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

router.put('/api/images/:productId', upload.single('file'), async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.productId, { imageKey: req.file.key }, { new: true })

        return res.status(200).json(product)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

router.get('/api/images/:imageKey', async (req, res) => {
    try {

        const key = req.params.imageKey

        if (!key) {
            res.status(400).json({ message: 'Image not found' })
        } else {
            const readStream = getFileStream(key)
            readStream.pipe(res)
        }
        
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

export default router