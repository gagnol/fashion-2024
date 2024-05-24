import mongoose, { Document, Schema } from "mongoose";


interface OrderDocument extends Document {
  quantity: number[],
  product: string[],
  image: string[],
  name: string[],
  prices: string[],
  email: string,
  user: string
  orderStatus: string,
  createdAt: Date
  shipping:number[]
  payment_status:string
  payment_intent:string
  totalAmount:number
  shippingAdress:string
}
 
const orderSchema = new Schema<OrderDocument>({

  product: { type: [String], required: true },//coming from metadata
  image: { type: [String], required: true },//coming from metadata
  name: { type: [String], required: true },//coming from metadata
  user: { type: String, required: true },//coming from metadata
  prices: { type: [String], required: true },//coming from metadata
  quantity: { type: [Number], required: true },//coming from metadata
  orderStatus: { type: String, default: "Processing" },//auto generated
  shipping: { type: [Number], required: true },//coming from metadata
  payment_status:{ type: String, required: true },//coming from payment_status
  payment_intent:{ type: String, required: true },//coming from payment_intent
  totalAmount: { type:Number, required: true },// comming from amount_total
  shippingAdress:{ type: String, required: true },//coming from metadata
  createdAt: { type: Date, default: Date.now }//auto generated
  
});

export default mongoose.models.Order || mongoose.model<OrderDocument>("Order", orderSchema);
