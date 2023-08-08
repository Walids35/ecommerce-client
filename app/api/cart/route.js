import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await mongooseConnect();
      const cart = await req.json()
      const products = await Product.find({_id: cart})
      return NextResponse.json(products, {status: 200});
    }catch(error){
      return NextResponse.json({ error: error.message });
    }
  }