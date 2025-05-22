import prisma from "./prisma";
import stripe from "./stripe";

export async function stripeGetProduct(reqEventId) {

    try {
        const event = await reqEventId;

        if(!event) return new Response('Evento não encontrado');
        
        const ticket = await stripe.products.list({

            

        })

    } catch (error) {
        
    }
    
}