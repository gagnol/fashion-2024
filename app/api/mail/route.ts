import { render } from "@react-email/render";
import WelcomeTemplate from "@/emails";
import { Resend } from "resend";
import dbConnect from "@/lib/db-connect";
import ramdomstring from 'randomstring'
import User from "@/lib/user-model";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, res: Response) {
	// rate limit
	// authorization

	const { email } = await request.json();
	await dbConnect();
  
  const userData = await User.findOne({ email: email })
  const ramdom = ramdomstring.generate(7);
  userData.token = await User.updateOne({ email: email }, { $set: { token: ramdom } });
  userData.tokenExpiration = await User.updateOne({ email: email }, 
    { $set: {tokenExpiration:Date.now()+2*60*1000 } });

  if (!userData) {
    return Response.json(
      {
        message: "El email no fue encontrado",
      
      },
      {
        status: 422,
      }
    );
  }


	const { data, error } = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: [email],
		subject: "Asistencia de PressConnect",
		html: render(WelcomeTemplate({ramdom})),
	});

	if (error) {
		return Response.json(error);
	}

	return Response.json({ message: "Te enviamos un email a",email });
}
