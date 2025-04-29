import bcrypt from "bcrypt"

export async function hashPassword(password) {

    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds);
    
};