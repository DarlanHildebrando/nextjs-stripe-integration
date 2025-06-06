import prisma from "@/app/lib/prisma";
import { authMiddleware } from "@/app/lib/authMiddleware";

export async function DELETE(req) {

    try{

    const authError = await authMiddleware(req)

    if(authError) return authError;

    console.log(JSON.stringify(req.user))

    const userDeleted = await prisma.client.delete({

        where:{id: req.user.id}
        
    })

    if (!userDeleted) {
        return new Response('Usuário não encontrado', { status: 404 });
      }

    return new Response('Usuário deletado!', {status: 200})

}catch(error){

    console.error('deub.o', error)
    return new Response("b.o ae paizao", {status: 500})

}
    
}