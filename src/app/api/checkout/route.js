import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
// import stripe from 'stripe';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { authOptions } from '../auth/[...nextauth]/route';
import { Order } from '@/models/Order';
import { cartProductTotalPrice } from '@/components/AppContext';
import { MenuItem } from '@/models/MenuItem';


// stripe(process.env.STRIPE_SECRET_KEY);

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

  // items must be checked with the ones in DataBase because the form POST might be modified (hacked) by the user
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

    // let productPrice = cartProductTotalPrice(productInfo) * 100

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
    success_url: process.env.NEXTAUTH_URL + 'cart?success=1',
    cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
    metadata: { orderId: orderDoc._id },
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

  return Response.json(stripeSession.url)

  
}