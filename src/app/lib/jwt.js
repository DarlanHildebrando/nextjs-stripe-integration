import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export function authenticateToken(token) {

    try {

        return jwt.verify(token, SECRET);

    } catch (error) {

        return null;

    }

}

export function generateToken(payload) {

    try {

        return jwt.sign(payload, SECRET);

    } catch (error) {

        return null;

    }

}

export function decodeToken(token){

    try {
        
        return jwt.decode(token, SECRET)

    } catch (error) {
        
        return null;

    }

}