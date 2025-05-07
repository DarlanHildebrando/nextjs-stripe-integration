import { stripeCreateTicket } from "@/app/lib/stripeCreateProduct";
import { authMiddleware } from "@/app/lib/authMiddleware";

export async function POST(req) {

    try {
        
    
    const authError = await authMiddleware(req)

    if(authError) return authError;

    const ticket = await req.json();

    const ticketStripe = await stripeCreateTicket(ticket)

    if(!ticketStripe) return new Response('deu ruim aí', {status: 500});

    return new Response("deu boa", {status: 201})

    } catch (error) {
        console.error(error)
        return new Response('deu b.o', {status: 500})
    }
}