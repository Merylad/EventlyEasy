import { registerDB, getUserByEmail} from "../models/usersModels";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv')

dotenv.config()


export const register = async (req: Request, res: Response): Promise<void> => {
    const { password, email, username } = req.body;


    // Ensure email and password are provided
    if (!email.trim() || !password.trim() ||!username.trim()) {
        res.status(400).json({ message: 'Username, email and password are required' });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
        return
    }

    try {
        const user = await registerDB(email, password, username);
        res.status(201).json({
            message: 'User registered successfully',
            user,
        });
    } catch (error: any) {
        console.log(error);

        if(error.code === '23505'){
            res.status(400).json({message : 'Email already exists'})
            return
        }

        // Generic server error
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body

    if (!email.trim() || !password.trim()) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
    }

    try {
        const user = await getUserByEmail(email)
        if(!user){
            res.status(400).json({ message: 'This email does not exist' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if(!passwordMatch){
            res.status(404).json({message : 'Wrong password'})
            return
        }

        const {ACCESS_TOKEN_SECRET} = process.env

        if (!ACCESS_TOKEN_SECRET) {
            res.status(500).json({ message: 'Missing access token secret' });
            return;
        }

        const accessToken = jwt.sign(
            {userid : user.id, email: user.email},
            ACCESS_TOKEN_SECRET,
            {expiresIn : '3600s'}

        )

        res.cookie('token', accessToken, {
            maxAge : 3600*1000,
            httpOnly : true
        })

        res.status(200).json({
            message: 'Successfully login',
            user : {id : user.id, email : user.email, username: user.username},
            token : accessToken
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}

