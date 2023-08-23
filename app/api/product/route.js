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

    const pageNumber = parseInt(propertiesObj.pageNumber) || 1; 
    const pageSize = parseInt(propertiesObj.pageSize) || 10; 
    
    // Filtering criteria
    const filter = {};
    for (const [key, value] of Object.entries(propertiesObj)) {
      if (key === "pageNumber" || key === "pageSize" || key === "sortBy" || key === "sortOrder") {
        continue; 
      }
      if (Array.isArray(value)) {
        const trimmedValues = value.map(v => v.trim()); 
        filter[`properties.${key}`] = {
          $in: trimmedValues.map(v => new RegExp(v, "i")), 
        };
      } else {
        const regexPattern = new RegExp(value, "i");
        filter[`properties.${key}`] = regexPattern;
      }
    }

    const sortBy = propertiesObj.sortBy || 'name'; 
    const sortOrder = propertiesObj.sortOrder || 'asc'; 
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return NextResponse.json({ products, totalPages, totalProducts });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}


