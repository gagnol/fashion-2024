import mongoose from 'mongoose'

export type Product = {
    _id:string,
    name: string,
    email: string,
    topics: string,
    mediaName: string,
    mediaType: string,
    location: string,
    bio: string
    
}
   
  const productSchema = new mongoose.Schema(
    { 
      name: { type: String, required: true, minlength: 3 },
      email: { type: String, required: true, unique: true },
      topics: { type: String, required: true }, // Array of topics
      mediaName: { type: String, required: true },
      mediaType: { type: String, required: true, enum: ['prensa', 'television', 'radio', 'digital'] },
      location: { type: String, required: true },
      bio: { type: String }, // Optional field
      },
    {
      timestamps: true,
    }
  );

const ProductModel =
  mongoose.models.Product || mongoose.model('Product', productSchema)
export default ProductModel