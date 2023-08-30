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
 *               parentCategoryId:
 *                 type: string
 *               filters:
 *                 type: object
 *                 properties:
 *                   Fabriquant:
 *                     type: array
 *                     items:
 *                       type: string
 *               pageNumber:
 *                 type: integer
 *               pageSize:
 *                 type: integer
 *               sortBy:
 *                 type: string
 *               sortOrder:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response with matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalPages:
 *                   type: integer
 *                 totalProducts:
 *                   type: integer
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
import { Category } from "@/models/Category";


export async function POST(req) {
  try {
    await mongooseConnect();

    const requestData = await req.json();

    const pageNumber = parseInt(requestData.pageNumber) || 1;
    const pageSize = parseInt(requestData.pageSize) || 10;
    const parentCategoryId = requestData.parentCategoryId; 

    const categories = await Category.find({ $or: [{ _id: parentCategoryId }, { parent: parentCategoryId }] });

    const categoryIds = categories.map(category => category._id);

    const filter = { category: { $in: categoryIds } };

    for (const [key, values] of Object.entries(requestData.properties || {})) {
      if (Array.isArray(values) && values.length > 0) {
        const trimmedValues = values.map(v => v.trim());
        filter[`properties.${key}`] = {
          $in: trimmedValues.map(v => new RegExp(v, "i")),
        };
      }
    }

    const sortBy = requestData.sortBy || 'title';
    const sortOrder = requestData.sortOrder || 'asc';
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










