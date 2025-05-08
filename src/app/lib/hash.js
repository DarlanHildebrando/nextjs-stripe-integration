import bcrypt from "bcrypt"

export async function hashPassword(password) {

    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds);
    
};

export async function compareHashPassword(password, hashed_password) {

    return await bcrypt.compare(password, hashed_password)
    
}
