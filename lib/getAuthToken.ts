import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAuthToken() {

    const cookieStore = await cookies();
    const authToken = cookieStore.get('next-auth.session-token')?.value || cookieStore.get('__Secure-next-auth.session-token')?.value;

    const token = await decode({token: authToken, secret: process.env.NEXTAUTH_SECRET!});


    // console.log("=======================> Token", token);
    return token?.accessToken;
}