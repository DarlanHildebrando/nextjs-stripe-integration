import stripe from "./stripe";
import { authMiddleware } from "./authMiddleware";
import prisma from "./prisma";

export async function stripeCheckoutMid(req) {

    try {


        const authError = await authMiddleware(req)

        if (authError) return authError;

        const user = await prisma.client.findUnique({

            where: { id: req.user.id }

        })

        if (!user) return new Response("usuário não encontrado", { status: 401 });

        if (!user.stripeCustomerId) {

            await prisma.client.update({

                where:{id: user.id},

                data: {

                    stripe_customer_id: "id_customer_example"

                }
            })
        }



        return new Response(JSON.stringify(user.stripe_customer_id), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (error) {

        console.error(error)

        return new Response("b.o do krai", {status: 500})

    }

}
