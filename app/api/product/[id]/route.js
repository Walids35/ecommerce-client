import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
 /**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get products by category ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the category to filter products
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
 export async function GET(req, { params }) {
    try {
      await mongooseConnect();
      const {id} = params;
      const products = await Product.find({ category: id });
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }