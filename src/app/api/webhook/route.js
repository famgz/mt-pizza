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

/*

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require('stripe')('sk_test_...');
const express = require('express');
const app = express();


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_477971896f48639bf6a1afdf6b50e6c8cf402a880b4f5cc8c88da988a6156e0c";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));

*/
