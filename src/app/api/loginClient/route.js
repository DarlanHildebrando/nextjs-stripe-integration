import prisma from "@/app/lib/prisma";
import { compareHashPassword } from "@/app/lib/hash";
import { generateToken } from "@/app/lib/jwt";

export async function POST(req) {

    try {

        const logInfo = await req.json()

        const { client_email, password } = logInfo;



        const user = await prisma.client.findUnique({

            where: { email: client_email }

        })

        if(!user) return new Response("Usuário não existe!", {status: 404})

        const password_compare = await compareHashPassword(password, user.client_password)

        if (!password_compare) return new Response("Senha inválida!", { status: 401 });

        const token = generateToken({ id: user.id, email: user.email })

        return new Response(JSON.stringify({ message: "Login realizado com sucesso", token }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Baerer ${token}`
            },
        });

    } catch (error) {

        console.error("Erro ao fazer login", error);
        return new Response("DEU B.OOOOOO", { status: 500 })

    }

}