import prisma from "@/app/lib/prisma";
import { hashPassword } from "@/app/lib/hash";
import { generateToken } from "@/app/lib/jwt";
import { decodeToken } from "@/app/lib/jwt";

export async function POST(req) {

    try{

        const client = await req.json();
        const {name, client_email, password} = client;

        const password_hash = await hashPassword(password)

        const user = await prisma.client.create({
            data:{

                client_name: name,
                email: client_email,
                client_password: password_hash

            }            
        })

        const token = generateToken({ id: user.id, email: user.email })

        return new Response(JSON.stringify({ message: "Cadastro realizado com sucesso!", token}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Baerer ${token}`
            },
        });


    } catch (error) {
        console.error('erro no insert', error);
        return new Response('deu b.o!!!!!!', { status: 500 });
      }
    
}