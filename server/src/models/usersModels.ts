import { db } from "../config/db";
import bcrypt from 'bcrypt';

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}


export const registerDB = async(email : string, password : string, username: string) => {
   

    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const [user] = await db('users')
        .insert ({
            email : email.toLocaleLowerCase(),
            password : hashPassword,
            username : username.toLocaleLowerCase()
        }, ['email', 'id', 'username'])

        return user
    } catch (error : any) {
        console.log(error)
        throw error
    }
    
}



export const getUserByEmail = async (email:string) : Promise<User | undefined> => {
    try {
        const user = await db('users').select('id', 'username', 'email', 'password')
        .where ({email : email.toLocaleLowerCase()})
        .first()

        return user
    } catch (error) {
        console.log(error)
        throw error
    }
}

