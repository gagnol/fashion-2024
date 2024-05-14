"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addUser } from "@/store/nextSlice";
import { useDispatch } from "react-redux";
import { Text } from "@radix-ui/themes";
import Link from "next/link";

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
      console.log(error);
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className='a_page'>
      <div className='a_container'>
        <form onSubmit={handleSubmit} >
          {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
          <h1 className="text-[21px] font-bold pb-5">Password Assistance</h1>
          <Text size="2" color="jade" >
            Enter the email address or mobile phone number associated with your account.&nbsp;
          </Text>
          <br/>
          <label className="text-slate-300 ">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="a_input"
            name="email"
          />
          <button className="btn btn-primary btn-outline w-full mt-5">
            Continue
          </button>
          <h5 className="a_label mt-5">Has your email or mobile number changed?</h5>
          <div className="a_label">  If you no longer use the email address associated with your account,
           you may contact&nbsp;
             <Link href="/customer" className="text-primary hover:underline">Customer Services </Link> for help restoring access to your account.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgot;
