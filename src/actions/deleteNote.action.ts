"use server";

import { getAuthToken } from "@/lib/getAuthToken";
import { revalidateTag } from "next/cache";

export async function deleteNote(id: string) {
  const token = await getAuthToken();

  if (!token) throw new Error("Unauthenticated");

  try {
    const res = await fetch(`${process.env.API_BASE_URL}notes/${id}`, {
      method: "DELETE",
      headers: {
        token: "3b8ny__" + token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error Fetching Data!");

    const data = await res.json();
    if (data?.msg === "done") {
      revalidateTag("notes");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
