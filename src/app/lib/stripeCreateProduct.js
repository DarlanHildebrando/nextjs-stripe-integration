import stripe from "./stripe";

export async function stripeCreateTicket(reqTicket){

    try {
        
    
    const ticket = await reqTicket;

    if(!ticket) return new Response("Ticket não existe ou é inválido");

    const product = await stripe.products.create({

        name: ticket.title,
        description: ticket.description

    })

    const centsValue = Math.round(parseFloat(ticket.price_for_client.replace(',', ".")) * 100)

    const price = await stripe.prices.create({

        unit_amount: centsValue,
        currency: 'brl',
        product: product.id

    })

    return new Response(
        JSON.stringify({
          message: "Produto e preço criados com sucesso",
          productId: product.id,
          priceId: price.id,
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );

} catch (error) {
    
    console.error("Erro ao criar produto ou preço na Stripe:", error);
    return new Response("Erro interno do servidor", { status: 500 });

    }

}