import prisma from "@/app/lib/prisma";
import { compareHashPassword } from "@/app/lib/hash";

export async function POST(req) {

    try{

        const logInfo = await req.json()
        
        const {emailUser, password} = logInfo;

        

        const user = await prisma.client.findUnique({

            where: {email: emailUser}

        })

        const password_compare =  await compareHashPassword(password, user.client_password)

        if (!password_compare) return new Response("Senha inválida!", {status: 401});

            return new Response(JSON.stringify({ message: "Login realizado com sucesso", user }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
              });

    }catch{

        return new Response("DEU B.OOOOOO", {status: 502})

    }
    
}