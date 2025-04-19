import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Produto Exemplo</h1>
      <button onClick={handleCheckout}>Comprar</button>
    </div>
  );
}
