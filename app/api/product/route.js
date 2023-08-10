/**
 * @swagger
 *  /api/product:
 *    get:
 *      summary: Get products based on properties
 *      tags: [cart]
 *      parameters:
 *        - in: query
 *          name: properties
 *          schema:
 *            type: string
 *          example: '{"Fabriquant":["Hp","dell","lenovo","msi","asus"]}'
 *          description: JSON object containing properties to filter products by
 *      responses:
 *        '200':
 *          description: Successful response with filtered products
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Product'
 *        '400':
 *          description: Bad request, invalid parameters
 *        '500':
 *          description: Internal server error
 */


import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import url from "url";

export async function GET(req) {
  try {
    await mongooseConnect();
    const { query } = url.parse(req.url, true);

    const propertiesObj = JSON.parse(decodeURIComponent(query?.properties));
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
