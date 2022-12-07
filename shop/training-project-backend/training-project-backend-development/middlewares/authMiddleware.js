import jwt from 'jsonwebtoken'
import { jwtKey } from '../config.js'

const checkAcces = (roles) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const token = req.cookies.jwt
            if (!token) {
                res.status(403).json({ message: 'Not authorized' })
            }
            const { roles: userRoles } = jwt.verify(token, jwtKey)


            const hasAccess = userRoles.some(role => roles.includes(role))


            if (!hasAccess) {
                res.status(401).json({ message: 'Forbidden' })
            }
            next()
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Not authorized' })
        }
    }
}

export default checkAcces