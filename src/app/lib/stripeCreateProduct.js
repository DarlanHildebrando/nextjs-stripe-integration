import stripe from "./stripe";

export async function stripeCreateTicket(reqTicket, reqMetaDados){

    try {
        
    
    const ticket = await reqTicket;
    const metaData = await reqMetaDados;

    if(!ticket) return new Response("Ticket não existe ou é inválido");


    const product = await stripe.products.create({

        name: ticket.title,
        description: ticket.description,
        metadata:{

            event_id: metaData.eventId,
            event_name: metaData.eventName

        }


    })

    const centsValue = Math.round(parseFloat(ticket.price_for_client.replace(',', ".")) * 100)

    const price = await stripe.prices.create({

        unit_amount: centsValue,
        currency: 'brl',
        product: product.id,
        metadata: {

            type: 'inteira'

        }

    })

    let halfPrice

    if(ticket.half_title){

        halfPrice = await stripe.prices.create({

        unit_amount: ticket.half_price_to_client,
        currency: 'brl',
        product: product.id,
        metadata: {

            type: 'meia'

        }

    })


    }

    return new Response(
        JSON.stringify({
          message: "Produto e preço criados com sucesso",
          productId: product.id,
          priceId: price.id,
          halfPrice: halfPrice?.id || null
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );

} catch (error) {
    
    console.error("Erro ao criar produto ou preço na Stripe:", error);
    return new Response("Erro interno do servidor", { status: 500 });

    }

}