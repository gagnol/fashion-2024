"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addUser } from "@/store/nextSlice";
import { useDispatch } from "react-redux";
import { Button, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import BgPage from "@/app/components/User-navigation/BgPage";
import toast from "react-hot-toast";

function Forgot() {
  const [error, setError] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const forgotResponse = await axios.post("/api/mail", {
        email: formData.get("email"),

      }); 
    
      dispatch(addUser(forgotResponse.data))
      return router.push("/validate");
    } catch (error) {
      toast.error('Incorrect user email', { duration: 4000, position: "top-center" })
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
   <BgPage>
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500  p-2 mb-2">{error}</div>}
          <h1 className="text-[21px] font-bold pb-5">Recuperación de clave</h1>
          <Text size="2" color="jade" >
            &nbsp;Ingresa la dirección de correo electrónico asociada con tu cuenta
          </Text>
          <br/>
          <label htmlFor="email" className="text-slate-300 ">Email</label>
          <TextField.Root size="3"
            type="email"
            placeholder="Email"
            name="email"
          />
         <Button variant="surface" size="3" type="submit" style={{ width: "100%", marginTop: "10px" }}>
            Continuar
          </Button>
          <h5 className="a_label mt-5">¿Tu correo electrónico ha cambiado?</h5>
          <div className="a_label"> Si ya no utilizas la dirección de correo electrónico asociada con tu cuenta, puedes contactar a&nbsp;
             <Link href="/customer" className="text-primary hover:underline">Servivio al cliente </Link>para obtener ayuda y restaurar el acceso a tu cuenta.
          </div>
        </form>
    </BgPage>  
    
  );
}

export default Forgot;
