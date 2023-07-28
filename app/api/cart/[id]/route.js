import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: the auto-generated id of the product 
 *         title:
 *           type: string
 *           description: the name of the product       
 *         description:
 *           type: string
 *           description: storage/color 
 *         price:
 *           type: number
 *           description: the price of the product
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: array of image URLs
 *         category:
 *           type: string
 *           description: the ID of the category the product belongs to
 *         properties:
 *           type: object
 *           description: additional properties of the product
 *       example:
 *         _id: 5dfreer
 *         title: iphone
 *         description: 1ToBlack
 *         price: 800
 *         images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         category: 60cfd3b82b5c3f0015c415e9
 *         properties:
 *           color: black
 *           storage: 1TB
 */


/**
 * @swagger
 * tags:
 *   name: cart
 *   description: API to manage products
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *       summary: Retrieve products by id 
 *       tags: [cart]
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           description: The ID of the product to retrieve
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *         '404':
 *           description: Product not found
 */
export async function GET(req,{params}) {
    try {
      await mongooseConnect();
      const { id }=params;
      const isValidObjectId = Types.ObjectId.isValid(id); 
      if (!isValidObjectId) {
          return NextResponse.json({ error: 'Invalid product ID' });
      }
      const product = await Product.find({ _id:id });
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }
  
  