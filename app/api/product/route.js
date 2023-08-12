/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Get products based on filter criteria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Fabriquant:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response with matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */


import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export async function POST(req) {
  try {
    await mongooseConnect();
    const propertiesObj = await req.json();
    const filter = {};
    for (const [key, value] of Object.entries(propertiesObj)) {
      if (Array.isArray(value)) {
        // Use $in operator for array values
        const trimmedValues = value.map(v => v.trim()); // Trim values
        filter[`properties.${key}`] = {
          $in: trimmedValues.map(v => new RegExp(v, "i")), // Use case-insensitive regex
        };
      } else {
        // For single values, use the exact match approach
        const regexPattern = new RegExp(value, "i");
        filter[`properties.${key}`] = regexPattern;
      }
    }
    const products = await Product.find(filter);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
