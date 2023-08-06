import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import url from "url";
/**
 * @swagger
 *   /api/search:
 *     get:
 *       summary: Search for products
 *       tags: [cart]
 *       description: Search for products by title.
 *       parameters:
 *         - in: query
 *           name: searchQuery
 *           schema:
 *             type: string
 *           required: true
 *           description: The search query to find products by title.
 *       responses:
 *         '200':
 *           description: A list of products matching the search query.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *         '500':
 *           description: Internal Server Error.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 */
export async function GET(req) {
    try {
        await mongooseConnect();
        const { query } = url.parse(req.url, true);
        const  searchQuery  = query?.searchQuery;
        const products = await Product.find({
        title: { $regex: searchQuery, $options: "i" },
      });
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }