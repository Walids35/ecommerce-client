import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { NextResponse } from "next/server";
/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: API for checkout and creating orders
 */

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Create an order and initiate the Stripe checkout session
 *     tags: [Checkout]
 *     requestBody:
 *       description: Cart products and customer information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               streetAddress:
 *                 type: string
 *               country:
 *                 type: string
 *               cartProducts:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response with the Stripe checkout URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
export async function POST(req) {
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = await req.json();
  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: { name: productInfo.title },
          unit_amount:  productInfo.price * 100,
        },
      });
    }
  }
  const orderDoc = await Order.create({
    line_items, name, email, city, postalCode,
    streetAddress, country, paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString(), test: 'ok' },
  });

  return NextResponse.json({
    url: session.url,
  });
}
