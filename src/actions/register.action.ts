"use server";
import { RegisterFormSchemaType } from "../interfaces/RegisterForm.schema";

export async function handleRegister(values: RegisterFormSchemaType) {
  try {
    const req = await fetch(
      `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const res = await req.json();
    if (res.ok) throw new Error(res?.msg || "Something went wrong!");
    return res;
  } catch (error) {
    console.log(error);
  }
}
