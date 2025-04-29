import prisma from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/hash";

export async function POST(req) {

    try{

        const client = await req.json();
        const {name, client_email, password} = client;

        const password_hash = await hashPassword(password)

        await prisma.client.create({
            data:{

                client_name: name,
                email: client_email,
                client_password: password_hash

            }            
        })

        return new Response('Usuário criado!', {status: 201});


    } catch (error) {
        console.error('erro no insert', error);
        return new Response('deu b.o!!!!!!', { status: 500 });
      }
    
}