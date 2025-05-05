import prisma from "@/app/lib/prisma";
import { authMiddleware } from "@/app/lib/authMiddleware";

export async function GET(req) {

    try{ 
    const authError = await authMiddleware(req)

    if(authError) return authError;
    
    const user = await prisma.client.findUnique({

            where: {id: req.user.id}

    })

    if(!user) return new Response("usuário não encontrado", {status: 401});

    return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    })
}catch(error){

    console.log('b.oooo', error)
 
    return new Response("Erro no server paizao", {status: 500})

}
}