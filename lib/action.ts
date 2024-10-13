'use server'
import { revalidatePath } from 'next/cache'
import UserModel from './user-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import SliderModel from './slider-model'
import PeriodistaModel from './periodista-model'
import PressModel from './Pressrelease-model'


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

export async function nuevaComicacion(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z.string().min(1, 'El título es obligatorio'),
    content: z.string().min(1, 'El contenido es obligatorio'),
    mediaType: z.enum(['prensa', 'television', 'radio', 'digital']),
    topic: z.enum(['politica', 'economia', 'tecnologia', 'cultura']),
    location: z.enum(['local', 'nacional', 'internacional']),
    reach: z.enum(['pequeno', 'mediano', 'grande']),
    distributionDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(), // Mark as optional
    email: z.string().email('Debe ser un correo válido'), // Validate email format
    image: z.string().optional(), // Optional string field for image
  });

  const parse = schema.safeParse({
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    mediaType: formData.get('mediaType') as string,
    topic: formData.get('topic') as string,
    location: formData.get('location') as string,
    reach: formData.get('reach') as string,
    distributionDate: formData.get('distributionDate') || undefined, // Handle undefined case
    email: formData.get('email') as string,
    image: formData.get('image') as string,
  });

  if (!parse.success) {
    console.log(parse.error); // Log errors to the console
    return { message: 'Form data is not valid', errors: parse.error.errors }; // Return error message and details
  }

  const data = parse.data;

  try {
    // Connect to the database and create the record
    await dbConnect();
    const comunicado = new PressModel(data);
    await comunicado.save();

    // Revalidate the path (optional)
    revalidatePath('/');

    // Return success message
    return { message: 'Comunicado enviado exitosamente' };
  } catch (e) {
    console.error(e); // Log any error
    return { message: 'Failed to create comunicado' };
  }
}
