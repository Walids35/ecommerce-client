import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
