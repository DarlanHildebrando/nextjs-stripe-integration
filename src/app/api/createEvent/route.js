import { authMiddleware } from "@/app/lib/authMiddleware";
import { stripeCreateTicket } from "@/app/lib/stripeCreateProduct";
import prisma from "@/app/lib/prisma";

export async function POST(req) {

    try{ 
    const authError = await authMiddleware(req)

    if(authError) return authError;

    const body = await req.json();
    const {eventName, descriptionEvent, ticketsEvent, photoEvent } = body;

    const event = await prisma.events.create({

     data:{

        event_name: eventName,
        description: descriptionEvent,
        client_id: req.user.id,
        tickets: { create: ticketsEvent },
        photo: photoEvent
        

     }

    })

    let ticketStripe;

    for(let i = 0; i<ticketsEvent.length; i++){ 

    const metadados = {eventId: event.id, eventName: event.event_name}
    ticketStripe = await stripeCreateTicket(ticketsEvent[i], metadados)

    if(!ticketStripe) return new Response('Ticket não fornecido', {status: 500});
  
  }
    
    return new Response('Evento criado!', {status: 201} )
    
}catch(error){

    console.error("Erro ao criar evento", error)
    return new Response("Erro interno no servidor", {status: 500})
    
}
    
}


