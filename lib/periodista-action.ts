import { z } from "zod";
import dbConnect from "./db-connect";
import { revalidatePath } from "next/cache";
import PeriodistaModel from "./product-model";

export async function createPeriodista(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email("Invalid email format"),
        topics: z.array(z.string()).min(1, "At least one topic must be selected"),
        mediaName: z.string().min(1, "Media name is required"),
        mediaType: z.enum(['prensa', 'television', 'radio', 'digital']),
        location: z.string().min(1, "Location is required"),
        bio: z.string().optional(),
      
    })
   
    const parse = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        topics: formData.getAll('topics'), // Assuming the topics are selected as multiple
        mediaName: formData.get('mediaName'),
        mediaType: formData.get('mediaType'),
        location: formData.get('location'),
        bio: formData.get('bio'),
      
    })
    if (!parse.success) {
      console.log(parse.error)
      return { message: 'El formulario no es válido' }
    }
    const data = parse.data
    try {
      await dbConnect()
      const periodista = new PeriodistaModel(data)
      await periodista.save()
      revalidatePath('/')
      return { message: `Te registraste con éxito periodista ${data.name}` }
    } catch (e) {
      return { message: 'Failed to create periodista' }
    }
  }
  
  