"use server"
import UserModel from './user-model'
import dbConnect from './db-connect'
import { z } from 'zod'
import bcryptjs from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth'


export async function createUser(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        cpassword: z.string().min(6),
    })
    const parse = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        cpassword: formData.get('cpassword'),
    })
    if (!parse.success) {
        console.log(parse.error)
        return { message: 'Form data is not valid' }
    }
    const data = parse.data
    try {
        await dbConnect();
        const existingUser = await UserModel.findOne({ email: data.email });
        if (existingUser) {
            return { message: 'User already exist' }
        }
        const hashedPassword = bcryptjs.hash(data.password, 10);

        const newUser = new UserModel({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            avatar: 'https://res.cloudinary.com/dps8xubee/image/upload/v1684105438/avatar/pmbgserj2nobgqn2auwr.png',
            isAdmin: false,
        });
        const user: any = await newUser.save();
        revalidatePath('/')

        return ({
            message: 'User created successfully!',
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } catch (e) {
        return { message: 'Failed to register' }
    }
}

//UPDATE USER

export async function updateUser(prevState: any, formData: FormData) {
    const schema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string().min(6),
        city: z.string().min(2),
        postal: z.string().min(4),
        country: z.string().min(2)
    });

    const parse = schema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        address: formData.get('address'),
        city: formData.get('city'),
        postal: formData.get('postal'),
        country: formData.get('country')
    });

    if (!parse.success) {
        console.log(parse.error);
        return { message: 'Form data is not valid' };
    }

    const data = parse.data;

    try {
        await dbConnect();

        const existingUser = await UserModel.findOne({ email: data.email });

        if (!existingUser) {
            return { message: 'User not found' };
        }

        // Update fields if they are provided in the form data
        if (data.name) {
            existingUser.name = data.name;
        }
        if (data.email) {
            existingUser.email = data.email;
        }

        if (data.password) {
            // Hash the new password before updating
            existingUser.password = await bcryptjs.hash(data.password, 10);
        }
        if (data.address) {
            existingUser.address = data.address;
        }
        if (data.address) {
            existingUser.address = data.address;
        }
        if (data.city) {
            existingUser.city = data.city;
        }
        if (data.postal) {
            existingUser.postal = data.postal;
        }
        if (data.country) {
            existingUser.country = data.country;
        }
        // Save the updated user
        await existingUser.save();
        revalidatePath('/')
        // You can return the updated user or a success message if needed
        return { message: 'Tus datos fueron actualizados', user: JSON.parse(JSON.stringify(existingUser)) };
    } catch (e) {
        console.error(e);
        return { message: 'Failed to update user' };
    }
}

