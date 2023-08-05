/**
   * @swagger
   * components:
   *   schemas:
   *     Category:
   *       type: object
   *       properties:
   *         _id:
   *           type: string
   *           description: the auto-generated id of the category
   *         name:
   *           type: string
   *           description: the name of the category
   *         parent:
   *           type: string
   *           description: the ID of the parent category (if any)
   *         properties:
   *           type: array
   *           items:
   *             type: object
   *           description: array of additional properties for the category
   *       example:
   *         _id: 60cfd3b82b5c3f0015c415e9
   *         name: iphone
   *         parent: mobile
   *         properties:
   *           - color: black
   */
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Successful response with the category object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export async function GET(req, { params }) {
  try {
    const {id} = params;
    await mongooseConnect();
    const category = await Category.find( { _id : id });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({error:error.message});
  }
}
