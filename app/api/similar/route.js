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

function jaccardSimilarity(propertiesA, propertiesB) {
  const setA = new Set(Object.keys(propertiesA));
  const setB = new Set(Object.keys(propertiesB));

  const intersectionSize = [...setA].filter(item => setB.has(item)).length;
  const unionSize = setA.size + setB.size - intersectionSize;

  return intersectionSize / unionSize;
}

export async function POST(req) {
  try {
    await mongooseConnect();
    const { _id } = await req.json();
    const referenceProduct = await Product.findById(_id);

    if (!referenceProduct) {
      console.log("Reference product not found");
      return NextResponse.json({ error: "Reference product not found" }, { status: 404 });
    }

    const referenceProperties = referenceProduct.properties || {};

    console.log("Reference product:", referenceProduct);
    console.log("Reference properties:", referenceProperties);

    const similarityThreshold = 1;

    const allProducts = await Product.find({ _id: { $ne: referenceProduct._id } });

    const similarProducts = allProducts
      .map(product => ({
        ...product.toObject(),
        similarity: jaccardSimilarity(referenceProperties, product.properties || {}),
      }))
      .filter(product => {
        return product.similarity >= similarityThreshold;
      })
      .sort((a, b) => b.similarity - a.similarity);

    console.log("similar product:", similarProducts);
    
    const numberOfSimilarProducts = 4;
    const mostSimilarProducts = similarProducts.slice(0, numberOfSimilarProducts);

    return NextResponse.json(mostSimilarProducts);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message });
  }
}




