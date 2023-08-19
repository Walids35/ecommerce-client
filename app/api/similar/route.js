/**
 * @swagger
 * /api/similar:
 *   post:
 *     summary: Calculate product similarity
 *     tags: [product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID of the reference product
 *             required:
 *               - _id
 *     responses:
 *       '200':
 *         description: Successful response with the most similar products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Reference product not found
 *       '500':
 *         description: Internal server error
 */
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


function cosineSimilarity(propertiesA, propertiesB) {
  const keys = new Set([...Object.keys(propertiesA), ...Object.keys(propertiesB)]);
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const key of keys) {
    const valueA = propertiesA[key] || 0;
    const valueB = propertiesB[key] || 0;
    dotProduct += valueA * valueB;
    normA += valueA * valueA;
    normB += valueB * valueB;
  }

  if (normA === 0 || normB === 0) {
    return 0; 
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function POST(req) {
  try {
    await mongooseConnect();
    const _id  = await req.json();
    const referenceProduct = await Product.findById(_id);
    if (!referenceProduct) {
      return NextResponse.json({ error: "Reference product not found" }, { status: 404 });
    }
    const referenceProperties = referenceProduct.properties || {};
    const allProducts = await Product.find({ _id: { $ne: referenceProduct._id } });
    const similarProducts = allProducts
      .map(product => ({
        ...product.toObject(),
        similarity: cosineSimilarity(referenceProperties, product.properties || {}),
      }))
      .sort((a, b) => b.similarity - a.similarity);

    const numberOfSimilarProducts = 4; 
    const mostSimilarProducts = similarProducts.slice(0, numberOfSimilarProducts);

    return NextResponse.json(mostSimilarProducts);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
