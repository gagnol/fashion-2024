'use server'
import { revalidatePath } from 'next/cache'
import ProductModel from './product-model'
import UserModel from './user-model'
import TaskModel from './task-model'
import dbConnect from './db-connect'
import { z } from 'zod'

export async function createProduct(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(3),
    image: z.array(z.string()),
    price: z.number().min(1),
    rating: z.number().min(1).max(5),
    video: z.string(),
    slug: z.string().min(1).max(1000),
    category: z.string().min(1),
    department: z.string().min(1),
    brand: z.string().min(1).max(100),
    countInStock: z.number().min(1),
    description: z.string().min(1).max(1000),
    discount: z.number().min(0).max(99),
    sizes: z.array(z.string()),

  })
  
  const image = formData.get('image');
  const parsedImage = image ? JSON.parse(image as string) : [];

  const sizes = formData.get('sizes');
  const parsedSizes = sizes ? JSON.parse(sizes as string) : [];

  const parse = schema.safeParse({
    name: formData.get('name'),
    image: parsedImage,
    price: Number(formData.get('price')),
    rating: Number(formData.get('rating')),
    video: formData.get('video'),
    slug: formData.get('slug'),
    category: formData.get('category'),
    department: formData.get('department'),
    brand: formData.get('brand'),
    countInStock: Number(formData.get('countInStock')),
    description: formData.get('description'),
    discount: Number(formData.get('discount')),
    sizes: parsedSizes


  })
  if (!parse.success) {
    console.log(parse.error)
    return { message: 'Form data is not valid' }
  }
  const data = parse.data
  try {
    await dbConnect()
    const product = new ProductModel(data)
    await product.save()
    revalidatePath('/')
    return { message: `Created product ${data.name}` }
  } catch (e) {
    return { message: 'Failed to create product' }
  }
}

export async function deleteProduct(formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
    name: z.string().min(1),
  })
  const data = schema.parse({
    _id: formData.get('_id'),
    name: formData.get('name'),
  })

  try {
    await dbConnect()
    await ProductModel.findOneAndDelete({ _id: data._id })
    revalidatePath('/')
    console.log({ message: `Deleted product ${data.name}` })
    return { message: `Deleted product ${data.name}` }
  } catch (e) {
    return { message: 'Failed to delete product' }
  }
}


export async function deleteUser(formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
    name: z.string().min(1),
  })
  const data = schema.parse({
    _id: formData.get('_id'),
    name: formData.get('name'),
  })

  try {
    await dbConnect()
    await UserModel.findOneAndDelete({ _id: data._id })
    revalidatePath('/')
    console.log({ message: `Deleted user ${data.name}` })
    return { message: `Deleted user ${data.name}` }
  } catch (e) {
    return { message: 'Failed to delete product' }
  }
}

// Update Answer
export async function updateAnswer(prevState: any, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
    description: z.string().min(1),
  });

  const parse = schema.safeParse({
    _id: formData.get('_id'),
    description: formData.get('description'),
  });

  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Form data is not valid' };
  }

  const data = parse.data;

  try {
    await dbConnect();

    const updatedAnswer = await TaskModel.findById(data._id);

    if (!updateAnswer) {
      return { message: 'User not found' };
    }
    console.log(data._id)
    
    revalidatePath('/');

    return JSON.parse(JSON.stringify(updatedAnswer)), { message: `Update customer question ${data._id}` };
  } catch (e) {
    console.error(e); // Log the actual error for debugging
    return { message: 'Failed to update answer' };
  }
}

// Update Stock
export async function updateStock(prevState: any, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
    stock: z.string().min(1),
  });

  const parse = schema.safeParse({
    _id: formData.get('_id'),
    stock: formData.get('stock'),
  });

  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Form data is not valid' };
  }

  const data = parse.data;

  try {
    await dbConnect();

    // Use { new: true } to return the modified document
    const updatedStock = await ProductModel.findByIdAndUpdate(
      { _id: data._id },
      { countInStock: data.stock },
      { new: true }
    );

    // Check if the question was found and updated successfully
    if (!updatedStock) {
      console.log({ message: `Not found for id ${data._id}` });
      return { message: ` Not found for id ${data._id}` };
    }

    revalidatePath('/');
    console.log({ message: `Update stock ${data._id}` });
    return JSON.parse(JSON.stringify(updatedStock)), { message: `Update stock ${data._id}` };
  } catch (e) {
    console.error(e); // Log the actual error for debugging
    return { message: 'Failed to update ' };
  }
}
//Update product

export async function updateProduct(prevState: any, formData: FormData) {
  const schema = z.object({
    _id:z.string().min(1),
    name: z.string().min(1),
    price: z.number().min(1),
    rating: z.number().min(1).max(5),
    video: z.string(),
    slug: z.string().min(1).max(1000),
    category: z.string().min(1),
    department: z.string().min(1),
    brand: z.string().min(1).max(100),
    countInStock: z.number().min(1),
    description: z.string().min(1).max(1000),
    discount: z.number().min(0).max(99),

  });

  const parse = schema.safeParse({
    _id: formData.get('_id'),
    name: formData.get('name'),
    price: Number(formData.get('price')),
    rating: Number(formData.get('rating')),
    video: formData.get('video'),
    slug: formData.get('slug'),
    category: formData.get('category'),
    department: formData.get('department'),
    brand: formData.get('brand'),
    countInStock: Number(formData.get('countInStock')),
    description: formData.get('description'),
    discount: Number(formData.get('discount')),
  });

  if (!parse.success) {
      console.log(parse.error);
      return { message: 'Form data is not valid' };
  }

  const data = parse.data;

  try {
      await dbConnect();
 
      const existingProduct = await ProductModel.findOne({ _id: data._id });

      if (!existingProduct) {
          return { message: 'Product not found' };
      }

      // Update fields if they are provided in the form data
      if (data.name) {
          existingProduct.name = data.name;
      }
      if (data.price) {
        existingProduct.price = data.price;
      }
      if (data.rating) {
          existingProduct.rating = data.rating;
      }
      if (data.video) {
          existingProduct.video = data.video;
      }
      if (data.slug) {
          existingProduct.slug = data.slug;
      }
      if (data.category) {
          existingProduct.category = data.category;
      }
      if (data.department) {
          existingProduct.department = data.department;
      }
      if (data.brand) {
        existingProduct.brand = data.brand;
    }
    if (data.countInStock) {
      existingProduct.countInStock = data.countInStock;
  }
  if (data.description) {
    existingProduct.description = data.description;
}
if (data.discount) {
  existingProduct.discount = data.discount;
}
      // Save the updated Product
      await existingProduct.save();
      revalidatePath('/')
      // You can return the updated Product or a success message if needed
      return { message: 'Product updated successfully', 
      product: JSON.parse(JSON.stringify(existingProduct)) };
  } catch (e) {
      console.error(e);
      return { message: 'Failed to update Product' };
  }
}