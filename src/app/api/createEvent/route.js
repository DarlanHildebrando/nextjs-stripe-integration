import { authMiddleware } from "@/app/lib/authMiddleware";
import prisma from "@/app/lib/prisma";

export async function POST(req) {

    try{ 
    const authError = await authMiddleware(req)

    if(authError) return authError;

    const body = await req.json();
    const {eventName, descriptionEvent, ticketsEvent, photoEvent } = body;

    await prisma.events.create({

     data:{

        event_name: eventName,
        description: descriptionEvent,
        client_id: req.user.id,
        tickets: { create: ticketsEvent },
        photo: photoEvent
        

     }

    })

    return new Response('Evento criado!', {status: 201} )
}catch(error){

    console.error("deu b.o ", error)
    return new Response("fudeu", {status: 500})
    
}
    
}



/** model Events {
  id          Int     @id @default(autoincrement())
  event_name  String
  description String?
  client_id   Int
  client      Client  @relation(fields: [client_id], references: [id])
  tickets     Tickets[]
  photo       Bytes?
  @@map("events")
}
 */