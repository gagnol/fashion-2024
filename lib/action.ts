'use server'
import { revalidatePath } from 'next/cache'
import ProductModel from './product-model'
import UserModel from './user-model'
import TaskModel from './task-model'
import OrderModel from './order-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import SliderModel from './slider-model'
import PeriodistaModel from './periodista-model'

export async function createProduct(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(3),
    email: z.string().min(3),
    topics: z.string().min(3),
    mediaName: z.string().min(3),
    mediaType: z.string().min(3),
    location: z.string().min(3),
    bio: z.string().min(3),
  })
    
  const parse = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    topics: formData.get('topics'),
    mediaName: formData.get('mediaName'),
    mediaType: formData.get('mediaType'),
    location: formData.get('location'),
    bio:formData.get('bio')
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
    _id: z.string().min(1),
    name: z.string().min(1),
    price: z.number().min(1),
    shipping: z.number(),
    rating: z.number().min(1).max(5),
    slug: z.string().min(1),
    category: z.string().min(1),
    department: z.string().min(1),
    brand: z.string().min(1).max(100),
    countInStock: z.number().min(1),
    description: z.string().min(1).max(1000),
    discount: z.number().min(0).max(99),
    isFeature: z.string().min(1),
    topDeal: z.string().min(1),
    bestSeller: z.string().min(1),
    video: z.string(),
    sizes: z.array(z.string()),
  });

  const sizesString = formData.get('sizes');
  const sizes = sizesString ? JSON.parse(sizesString.toString()) : [];

  const parse = schema.safeParse({
    _id: formData.get('_id') as string,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    department: formData.get('department') as string,
    brand: formData.get('brand') as string,
    price: Number(formData.get('price')),
    shipping: Number(formData.get('shipping')),
    discount: Number(formData.get('discount')),
    countInStock: Number(formData.get('countInStock')),
    rating: Number(formData.get('rating')),
    slug: formData.get('slug') as string,
    isFeature: formData.get('isFeature') as string,
    topDeal: formData.get('topDeal') as string,
    bestSeller: formData.get('bestSeller')  as string,
    video: formData.get('video') as string,
    sizes: sizes,
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

    existingProduct.name = data.name;
    existingProduct.price = data.price;
    existingProduct.rating = data.rating;
    existingProduct.video = data.video;
    existingProduct.slug = data.slug;
    existingProduct.category = data.category;
    existingProduct.department = data.department;
    existingProduct.brand = data.brand;
    existingProduct.countInStock = data.countInStock;
    existingProduct.description = data.description;
    existingProduct.discount = data.discount;
    existingProduct.sizes = data.sizes;
    existingProduct.bestSeller = data.bestSeller;
    existingProduct.isFeature = data.isFeature;
    existingProduct.topDeal = data.topDeal;
    

    await existingProduct.save();
    revalidatePath('/');
    return { message: 'Product updated successfully', product: JSON.parse(JSON.stringify(existingProduct)) };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to update Product' };
  }
}

/* graphics */
export const getSalesPerMonth = async () => {
  await dbConnect()
  const orders = await OrderModel.find()

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + (order.totalAmount/100);
    // For June
    // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
    return acc
  }, {})

  const graphData = Array.from({ length: 12}, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}

/*daily  graphics */
export const getSalesPerDay = async () => {
  await dbConnect()
  const orders = await OrderModel.find()

  // Get the current month and year
  const now = new Date();
  const currentMonth = now.getMonth(); // 0 for January --> 11 for December
  const currentYear = now.getFullYear();

  // Get the full name of the current month
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentYear, currentMonth));

  // Filter orders to include only those from the current month and year
  const ordersThisMonth = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
  });

  // Group orders by day of the month
  const salesPerDay = ordersThisMonth.reduce((acc, order) => {
    const day = new Date(order.createdAt).getDate(); // Day of the month (1-31)
    acc[day] = (acc[day] || 0) + (order.totalAmount / 100);
    return acc;
  }, {});

  // Generate an array of daily sales data for the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const graphData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1; // Days start from 1
    return { name: `${day}`, sales: salesPerDay[day] || 0 };
  });

  // Return the graph data along with the month name
  return { month: monthName, data: graphData };
}

//UPDATE BANNER
export async function updateBannerProduct(prevState: any, formData: FormData) {
  const schema = z.object({
    _id: z.string().min(1),
    text: z.string().min(1),
    image: z.string().min(1),
    link: z.string().min(1),
    
  });
  
  const parse = schema.safeParse({
    _id: formData.get('_id') as string,
    text: formData.get('text') as string,
    image: formData.get('image') as string,
    link: formData.get('link') as string,    
  });

  if (!parse.success) {
    console.log(parse.error);
    return { message: 'Form data is not valid' };
  }

  const data = parse.data;

  try {
    await dbConnect();

    const existingProduct = await SliderModel.findOne({ _id: data._id });

    if (!existingProduct) {
      return { message: 'Product not found' };
    }

    existingProduct.text = data.text;
    existingProduct.image = data.image;
    existingProduct.link = data.link
    
    await existingProduct.save();
    revalidatePath('/');
    return { message: 'Slider updated successfully', product: JSON.parse(JSON.stringify(existingProduct)) };
  } catch (e) {
    console.error(e);
    return { message: 'Failed to update Slider' };
  }
}


//crear Periodista
export async function createPeriodista(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    email: z.string().email({ message: "Debe ser un correo electrónico válido" }),
    topics: z.array(z.string()).nonempty({ message: "Debe seleccionar al menos una temática" }),
    mediaName: z.string().min(1, { message: "El nombre del medio es obligatorio" }),
    mediaType: z.enum(['prensa', 'television', 'radio', 'digital'] ),
    location: z.string().min(1, { message: "La ubicación es obligatoria" }),
    bio: z.string().optional(), // Biografía opcional
  });

  // Parsear los datos del formulario utilizando formData.get para extraer los valores
  const parse = schema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    topics: formData.getAll('topics') as string[],  // getAll para múltiples valores (array)
    mediaName: formData.get('mediaName') as string,
    mediaType: formData.get('mediaType') as string,
    location: formData.get('location') as string,
    bio: formData.get('bio') as string | undefined, // El campo bio es opcional
  });

  if (!parse.success) {
    console.log(parse.error); // Mostrar errores en la consola
    return { message: 'Form data is not valid', errors: parse.error.errors }; // Retornar un objeto con el mensaje de error y los detalles de validación
  }
    const data = parse.data;
  try {
    // Conectar a la base de datos y crear el registro
    await dbConnect();
    const periodista = new PeriodistaModel(data);
    await periodista.save();

    // Revalidar la ruta (opcional, si es necesario)
    revalidatePath('/');

    // Retornar un mensaje de éxito
    return { message: 'Periodista registrado exitosamente' };
  } catch (e) {
    console.error(e); // Mostrar cualquier error
    return { message: 'Failed to create ' };
  }
}


//crear comunicador
export async function createComunicador(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, "El nombre debe tener al menos 3 caracteres."),
    email: z.string().email("Correo electrónico no válido."),
    sector: z.enum(['empresarial', 'publico', 'ong', 'asociacion']),
    organization: z.string().min(1, "El nombre de la organización debe tener al menos 3 caracteres."),
    specialization: z.enum(['corporativa', 'crisis', 'digital', 'rse']),
    experience: z.number().min(1, "Debe tener al menos 1 año de experiencia."),
    location: z.string().min(3, "La ubicación debe tener al menos 3 caracteres."),
    bio: z.string().optional(),
  })
  
  const parse = schema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    sector: formData.get('sector') as string,
    organization: formData.get('organization') as string,
    specialization: formData.get('specialization') as string,
    experience: Number(formData.get('experience')), // Convert to number
    location: formData.get('location') as string,
    bio: formData.get('bio') as string | undefined, // Optional field
  })
  if (!parse.success) {
    console.log(parse.error)
    return { message: 'Form data is not valid' }
  }
  const data = parse.data
  try {
    await dbConnect()
    const product = new SliderModel(data)
    await product.save()
    revalidatePath('/')
    return { message: 'Comunicador registrado exitosamente' }
  } catch (e) {
    return { message: 'Failed to create ' }
  }
}
