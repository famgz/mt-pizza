import { Order } from '@/models/Order';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    const reqBody = await req.text();
    const signSecret = process.env.STRIPE_SIGN_SECRET;
    event = stripe.webhooks.constructEvent(reqBody, sig, signSecret);
  } catch (error) {
    console.error('stripe error');
    console.log(error);
    return Response.json(error, { status: 400 });
  }

  /* chain of success event types:
      'payment_intent.succeeded'
      'checkout.session.completed'
      'payment_intent.created'
      'charge.succeeded'
  */

  if(event.type === 'checkout.session.completed') {
    console.log(event)
    const orderId = event?.data?.object?.metadata?.orderId
    const isPaid = event?.data?.object?.payment_status === 'paid'
    console.log({orderId})
    if(isPaid) {
      await Order.findByIdAndUpdate(orderId, {paid: true})
      console.log('Order succesfully paid!')
    }
  }

  return Response.json('ok', { status: 200 });
}
