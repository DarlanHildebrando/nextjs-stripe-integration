import prisma from "./prisma";
import stripe from "./stripe";

export async function stripeGetProduct(reqEventId) {

    try {
        const eventId = await reqEventId;

        if (!eventId) return console.log('Id não fornecido');

        const eventTicket = await stripe.products.list({

            where: { id: eventId }

        })

        if (!eventTicket) return console.log('Produto não encontrado');

        console.log(JSON.stringify(eventTicket))

        return new Response(
            JSON.stringify({
                message: "Produto:",
                produtoId: eventTicket.id,
                nome: eventTicket.object
            }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {

    }

}