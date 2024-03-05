import { MenuItem } from '@/models/MenuItem';
import { Order } from '@/models/Order';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  const orderId = orderDoc._id.toString();

  // items must match the ones in DataBase
  // because the form POST might be modified (hacked) by the user
  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);
    const productName = productInfo.name;

    let productPrice = productInfo.basePrice;
    if (cartProduct.size) {
      const size = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.size._id.toString()
      );
      productPrice += size.price;
    }
    if (cartProduct.extras?.length > 0) {
      for (const cartProductExtra of cartProduct.extras) {
        const extraInfo = productInfo.extraIngredients.find(
          (extra) => extra._id.toString() === cartProductExtra._id.toString()
        );
        productPrice += extraInfo.price;
      }
    }

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100, // in cents
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL + 'orders/' + orderId + '?clear-cart=1', // + 'cart?success=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: { orderId: orderId },
    payment_intent_data: {
      metadata: { orderId: orderId },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'USD' }, // price in cents
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
}
