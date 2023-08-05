import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { Category } from "@/models/Category";
 /**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get products by category ID
 *     tags: [cart]
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

 async function getProductsByCategory(categoryID) {
  return await Product.find( {category: categoryID}).exec()
 }

 async function getProductsByCategoryAndChildren(categoryId){
  const products = await getProductsByCategory(categoryId)
  const children = await Category.find({ parent: categoryId })

  for (const child of children){
    const childProducts = await getProductsByCategoryAndChildren(child._id)
    products.push(...childProducts)
  }

  return products
 }

 export async function GET(req, { params }) {
    try {
      await mongooseConnect();
      const { id } = params;
      const products = await getProductsByCategoryAndChildren(id)
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }