import prisma from "@/app/lib/prisma";
import { authMiddleware } from "@/app/lib/authMiddleware";

export async function POST(req) {

    const authError = await authMiddleware(req)

    if(authError) return authError;

    const tickets = await req.json();

    


    
}