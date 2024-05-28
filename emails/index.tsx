import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";



export const KoalaWelcomeEmail = ({ramdom}:any) => (
	<Html>
		<Head />
		<Preview>
			The sales intelligence platform that helps you uncover qualified
			leads.
		</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img
					src={`https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/fcf7ac46-f921-4b66-b183-8db87d9e61eb._CR0%2C0%2C1800%2C1800_SX200_.png`}
					width="50"
					height="50"
					alt="logo"
					style={logo}
				/>
				
				<Text style={paragraph}>
				To authenticate, please use the following One Time Password (OTP):
				</Text>
				<Section style={btnContainer}>
					
					<Text style={paragraph}><strong>{ramdom}</strong></Text>
					
				</Section>
				<Text style={paragraph}>
				Don&apos;t share this OTP with anyone.
         		Our customer service team will never ask you for your password, OTP, 
				credit card, or banking info.
        		We hope to see you again soon.
				</Text>
				
				<Text style={paragraph}>
					Best,
					<br />
					Legendary
				</Text>
				<Hr style={hr} />
				<Text style={footer}>If you no longer use the email 
				address associated with your account, you may contact 
				Customer Services for help restoring access to your account.</Text>
			</Container>
		</Body>
	</Html>
);

export default KoalaWelcomeEmail;

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
};

const logo = {
	margin: "0 auto",
};

const paragraph = {
	fontSize: "16px",
	lineHeight: "26px",
};

const btnContainer = {
	textAlign: "center" as const,
};

const button = {
	backgroundColor: "#5F51E8",
	borderRadius: "3px",
	color: "#fff",
	fontSize: "16px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "5px",
};

const hr = {
	borderColor: "#cccccc",
	margin: "20px 0",
};

const footer = {
	color: "#8898aa",
	fontSize: "12px",
};
