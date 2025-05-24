import { authMiddleware } from "@/app/lib/authMiddleware";
import { stripeGetProduct } from "@/app/lib/stripeGetProduct";
import prisma from "@/app/lib/prisma";

export async function POST(req) {

    try {
        
    
    const authError = await authMiddleware(req)

    if(authError) return authError;

    const eventJson = await req.json();

    const idInt = parseInt(eventJson.id, 10)

    const event = await prisma.events.findUnique({

        where: {id: idInt}

    })

    if(!event) return new Response("Evento não encontrado", {status: 404})


    const product = stripeGetProduct(idInt);

    console.log(product)

    return new Response("deu boa", {status: 201})

    } catch (error) {
        console.error(error)
        return new Response('Erro interno no servidor', {status: 500})
    }
}